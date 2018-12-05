import svg from "app/utils/svg";
import { ConditionModel, ConditionsState } from "app/models/ConditionsModel";

const { conditions } = svg;

export const getMockConditions = ():ConditionsState => Object.keys(conditions).map((condition, index:number):ConditionModel => ({
    id: index,
    name: condition,
    icon: condition,
}));
