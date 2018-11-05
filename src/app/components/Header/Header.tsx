import * as React from 'react';

import './Header.scss';

/**
 * Header Properties.
 */
export namespace Header {
    export interface Props {
        /** Brand logotype image */
        logotype:React.ReactElement<SVGElement|HTMLElement>;
        /** Example header message prop */
        message:string;
    }

    export interface State {
        /** Current examples message set on Header */
        currentMessage:string,
    }
}

/**
 * Application Header.
 */
export class Header extends React.Component<Header.Props, Header.State> {
    constructor(props:Header.Props) {
        super(props);

        this.state = {
            currentMessage: this.props.message,
        }
    }

    switchMessage = (text:string) => {
        if(text) {
            this.setState({ currentMessage: text });
        }
    };

    render() {
        const {
            logotype,
        } = this.props;

        const {
            currentMessage,
        } = this.state;

        return (
            <header
                className="app-header"
                onClick={ () => this.switchMessage('Don\' touch this!' ) }>
                <div className="logotype-container">
                    { logotype }
                </div>
                <h3 className="header-message">
                    { currentMessage }
                </h3>
            </header>
        );
    }
}
