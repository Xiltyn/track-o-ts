import * as React from 'react';

import './Header.scss';
import { Logo } from "app/components/__universal/Logo/Logo";
import svg from "app/utils/svg";

/**
 * Header Properties.
 */
export namespace Header {
    export interface Props {
        /** Redux actions object for App Container */
        toggleSidebar:() => void;
        logout:() => void;
    }

    export interface State {

    }
}

/**
 * Application Header.
 */
export class Header extends React.Component<Header.Props, Header.State> {
    render() {
        const { logout, toggleSidebar } = this.props;

        return (
            <header
                className="app-header">
                <div onClick={ () => toggleSidebar() }>
                    { svg.sidebar }
                </div>
                <Logo/>
                <div onClick={ () => logout() }>
                    { svg.logout }
                </div>
            </header>
        );
    }
}
