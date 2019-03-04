import * as React from "react";
import { SidebarComponent } from "app/components/Sidebar/Sidebar";

export const SidebarCharacters = (props:Pick<SidebarComponent.Props, 'characters'|'actions'>) => <ul className="sidebar-list sidebar-characters">
    {
        props.characters && props.characters.sort((a,b) => a.name.localeCompare(b.name)).map(character => (
            <li
                key={ character.id }>
                <p>{ character.name }</p>
            </li>
        ))
    }
</ul>;
