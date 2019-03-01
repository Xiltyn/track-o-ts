import * as React from "react";
import { SidebarComponent } from "app/components/Sidebar/Sidebar";

export const SidebarEncounters = (props:Pick<SidebarComponent.Props, 'encounters'|'actions'>) => <ul className="sidebar-list sidebar-encounters">
    {
        props.encounters && props.encounters.sort((a,b) => a.name.localeCompare(b.name)).map(encounter => (
            <li
                className={ encounter.isActive ? 'active' : '' }
                onClick={ () => props.actions && props.actions.setActiveEncounter(encounter.id) }
                key={ encounter.id }>
                <p>{ encounter.name }</p>
            </li>
        ))
    }
</ul>;
