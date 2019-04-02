import * as React from "react";
import { SidebarComponent } from "app/components/Sidebar/Sidebar";

export const SidebarMonsters = (props:Pick<SidebarComponent.Props, 'monsters'|'actions'>) => <ul className="sidebar-list sidebar-characters">
    {
        props.monsters && props.monsters.sort((a,b) => a.name.localeCompare(b.name)).map(monster => (
            <li
                key={ monster.id }>
                <p>{ monster.name }</p>
            </li>
        ))
    }
</ul>;
