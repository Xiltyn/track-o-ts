import * as React from 'react';

import './Header.scss';
import { Logo } from "app/components/__universal/Logo/Logo";

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
                <h3 onClick={ () => toggleSidebar() }>
                    Sidebar
                </h3>
                <Logo/>
                <h3 onClick={ () => logout() }>
                    Logout
                </h3>
            </header>
        );
    }
}
