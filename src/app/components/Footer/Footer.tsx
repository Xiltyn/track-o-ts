import * as React from 'react';

import './Footer.scss';

export namespace Footer {
    export interface Props {}
}

export class Footer extends React.Component<Footer.Props> {
    static defaultProps:Partial<Footer.Props> = {};

    render() {
        return <footer className="normal">Well damn</footer>;
    }
}
