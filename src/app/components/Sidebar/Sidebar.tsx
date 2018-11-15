import * as React from 'react';
import { sidebarMenuData, sidebarSections } from "app/models/Sidebar.types";
import animationContainer from "app/utils/animationContainer/animationContainer";
import { SidebarMenu } from "app/components/Sidebar/SidebarMenu/SidebarMenu";
import { SidebarActions } from "app/modules/sidebar/actions";

import './Sidebar.scss';
import { RouteComponentProps, withRouter } from "react-router";

const AnimatedSidebarMenu = animationContainer(SidebarMenu);

export namespace SidebarComponent {
    export interface Props {
        actions?: SidebarActions,
        menuData: sidebarMenuData,
        currentSection: sidebarSections,
        showSidebar: boolean,
    }
}

class SidebarComponent extends React.Component<SidebarComponent.Props & RouteComponentProps> {
    updateSection = (payload:{currentSection:sidebarSections}) => {
        const { actions, history } = this.props;

        if(actions) actions.updateSection(payload);
        history.push(`/app/${ payload.currentSection === 'menu' ? '/' : payload.currentSection }`)

    };

    render() {
        const {
            menuData,
            currentSection,
            showSidebar,
        } = this.props;

        const currenMenuItem = menuData.find(el => el.slug === currentSection);

        return(
            <div className={ `sidebar ${ showSidebar ? 'active' : '' }` }>
                <h3 className="section-header">
                    { currenMenuItem && currenMenuItem.name }
                </h3>
                <div className="current-section-container">
                    <AnimatedSidebarMenu
                        isMounted={ currentSection === 'menu' }
                        menuData={ menuData }
                        onItemSelect={ this.updateSection } />
                </div>
            </div>
        )
    }

}

export const Sidebar = withRouter<SidebarComponent.Props & RouteComponentProps>(SidebarComponent);
