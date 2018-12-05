import * as React from 'react';
import { ConditionModel, ConditionsState } from "app/models/ConditionsModel";
import { getMockConditions } from './Conditions.mock';

import './ConditionsPicker.scss';
import svg from "app/utils/svg";

export namespace ConditionsPicker {
    export interface Props {
        conditions:ConditionsState,
        dispatchAction:(condition:ConditionModel) => void,
    }

    export interface State {
        activeCondition: number|null,
    }
}

export class ConditionsPicker extends React.Component<ConditionsPicker.Props, ConditionsPicker.State> {
    state:ConditionsPicker.State = {
        activeCondition: null,
    };

    static defaultProps:Pick<ConditionsPicker.Props, 'conditions'> = {
        conditions: getMockConditions(),
    };

    handleConditionClick = (condition:ConditionModel) => {
        const { dispatchAction } = this.props;

        console.log(this.state.activeCondition);
        this.setState({
            activeCondition: condition.id,
        });

        dispatchAction(condition);
    };

    render() {
        const { conditions } = this.props;
        const { activeCondition } = this.state;

        return(
            <div className="conditions-picker">
                {
                    conditions.map(condition => (
                        <div
                            key={ condition.id }
                            className={ `condition ${ condition.name } ${condition.id === activeCondition ? 'active' : '' }` }
                            onClick={ () => this.handleConditionClick(condition) }>
                            { svg.conditions[condition.icon] }
                        </div>
                    ))
                }
            </div>
        )
    }
}
