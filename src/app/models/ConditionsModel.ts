export interface ConditionModel {
    id:number,
    name:string,
    icon:JSX.Element|HTMLOrSVGElement,
}

export type ConditionsState = Array<ConditionModel>;
