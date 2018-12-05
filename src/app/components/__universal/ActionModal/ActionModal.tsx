import * as React from 'react';
import Button from "app/components/__universal/Button/Button";
import './ActionModal.scss';

export namespace ActionModal {
    export interface Props {
        header: string;
        description: string;
        children: JSX.Element;
        enableNav?: boolean;
        onCancel?: (...params:any) => void;
        onConfirm?: (...params:any) => void;
    }
}

export class ActionModal extends React.Component<ActionModal.Props> {
    //private AnimatedChildren:any;

    static defaultProps:Pick<ActionModal.Props, 'header'|'description'> = {
        header: 'Action Modal',
        description: 'Action Modal description'
    };

    //componentDidMount() {
    //    const { children } = this.props;
    //
    //    this.AnimatedChildren = animationContainer(children);
    //}

    render() {
        const {
            header,
            description,
            onConfirm,
            onCancel,
            children,
            enableNav,
        } = this.props;

        return (
            <div className="modal">
                <header className="modal-header">
                    <h3>
                        { header }
                    </h3>
                    <p>
                        { description }
                    </p>
                </header>
                <div className="modal-content">
                    { children }
                </div>

                {
                    enableNav && <div className="modal-controls">
                        <Button
                            label='Cancel'
                            onSubmit={ onCancel }
                            isBusy={ false }/>
                        <Button
                            label='Confirm'
                            onSubmit={ onConfirm }
                            isBusy={ false }/>
                    </div>
                }
            </div>
        )
    }
}
