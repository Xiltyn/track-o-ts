import * as React from 'react';
import { sidebarMenuData, sidebarSections } from "app/models/Sidebar.types";
import { SidebarMenu } from "app/components/Sidebar/SidebarMenu/SidebarMenu";
import { SidebarActions } from "app/modules/sidebar/actions";

import './Sidebar.scss';
import { RouteComponentProps, withRouter } from "react-router";
import { Encounters } from "app/components/Encounters/Encounters";
import { EncounterModel } from "app/models/EncounterModel";
import animationContainer from "app/utils/animationContainer/animationContainer";


export namespace SidebarComponent {
    export interface Props {
        actions?: SidebarActions & Encounters.encountersActions,
        menuData: sidebarMenuData,
        currentSection: sidebarSections,
        encounters: Array<EncounterModel>|undefined,
        showSidebar: boolean,
    }
}

const SidebarEncounters = (props:Pick<SidebarComponent.Props, 'encounters'|'actions'>) => <ul className="sidebar-list sidebar-encounters">
    {
        props.encounters && props.encounters.map(encounter => (
            <li
                className={ encounter.isActive ? 'active' : '' }
                onClick={ () => props.actions && props.actions.setActiveEncounter(encounter.id) }
                key={ encounter.id }>
                <p>{ encounter.name }</p>
            </li>
        ))
    }
</ul>;

const AnimatedSidebarEncounters = animationContainer(SidebarEncounters);

class SidebarComponent extends React.Component<SidebarComponent.Props & RouteComponentProps> {
    updateSection = (payload:{currentSection:sidebarSections}) => {
        const { actions, history } = this.props;

        if(actions) actions.updateSection(payload);
        history.push(`/${ payload.currentSection !== 'menu' && payload.currentSection }`)

    };

    render() {
        const {
            menuData,
            currentSection,
            encounters,
            showSidebar,
            actions,
        } = this.props;

        const currenMenuItem = menuData.find(el => el.slug === currentSection);

        return(
            <div className={ `sidebar ${ showSidebar ? 'active' : '' }` }>
                <h3 className="section-header">
                    Menu
                    { /*<button className="btn-back">*/ }
                        { /*{ svg.return }*/ }
                    { /*</button>*/ }
                </h3>
                <div className="current-section-container">
                    <SidebarMenu
                        onItemSelect={ this.updateSection }
                        currentActive={ currenMenuItem && currenMenuItem.id }
                        menuData={ menuData }/>
                    <AnimatedSidebarEncounters
                        isMounted={ currenMenuItem && currenMenuItem.slug === 'encounters' }
                        encounters={ encounters }
                        actions={ actions }/>
                </div>
            </div>
        )
    }

}

export const Sidebar = withRouter<SidebarComponent.Props & RouteComponentProps>(SidebarComponent);
