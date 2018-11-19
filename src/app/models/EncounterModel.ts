import { funcOptions } from "app/models/general.types";
import { ConditionModel, ConditionsState } from "app/models/ConditionsModel";

export type EncounterModelProps = {
    [key:string]:number|string|boolean|Array<Item>,
    isActive:boolean,
    id:number;
    name:string;
    items:Array<Item>;
}

export type Item = {
    id:number,
    name:string,
    color:string;
    position:number,
    statuses:ConditionsState,
}


export interface EncountersModel {
    encounters:Array<EncounterModel>|undefined,
}

export class EncounterModel {
    [key:string]:any;

    public id:number = 0;
    public name:string = '';
    public items:Array<Item> = [];
    public isActive:boolean = false;

    public constructor(data:EncounterModelProps) {
        this.assignData(data);
        this.setActive = this.setActive.bind(this);
        this.setInactive = this.setInactive.bind(this);
        this.addStatus = this.addStatus.bind(this);
    }

    private assignData = (data:EncounterModelProps, options?:funcOptions) => {
        const thisKeys = Object.keys(this);

        for(let key of thisKeys) {
            if(data[ key ] !== this[ key ]) {
                this[ key ] = data[ key ];
            }
        }
    };

    public setActive():boolean {
        console.log('Encounter isActive :: ', this.isActive);
        return this.isActive = true;
    }

    public setInactive():boolean {
        console.log('Encounter isActive :: ', this.isActive);
        return this.isActive = false;
    }

    public addStatus(itemId:number, condition:ConditionModel):Array<Item> {
        const { items } = this;
        const itemToEdit = items.find(item => item.id === itemId);

        if(itemToEdit) itemToEdit.statuses = [ ...itemToEdit.statuses, condition ];

        console.log('==> addStatus result :: ', itemToEdit);

        return items;
    }

}
