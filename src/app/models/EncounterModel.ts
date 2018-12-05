import { funcOptions } from "app/models/general.types";
import { ConditionModel, ConditionsState } from "app/models/ConditionsModel";

export type EncounterModelProps = {
    [key:string]:number|string|boolean|Array<Item>|undefined,
    isActive?:boolean,
    id?:string;
    name:string;
    items:Array<Item>;
}

export type Item = {
    id:number,
    name:string,
    isActive:boolean,
    color?:string;
    roll:number;
    statuses:ConditionsState,
}


export interface EncountersModel {
    encounters:Array<EncounterModel>|undefined,
}

export class EncounterModel {
    [key:string]:any;

    public id:string = '';
    public name:string = '';
    public items:Array<Item> = [];
    public isActive:boolean = false;
    public roles:{[key:string]: string} = {};

    public constructor(data:EncounterModelProps) {
        this.assignData(data);

        if(data.isActive === undefined) this.isActive = false;

        //if(data.id) {
        //    if(data.id > EncounterModel._id ) {
        //        EncounterModel._id = data.id;
        //    } else {
        //        this.id = data.id;
        //    }
        //} else {
        //    this.incrementId.bind(this)();
        //}

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

    //private incrementId() {
    //    this.id = EncounterModel._id++;
    //
    //    return this;
    //};

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

    public get plainData() {
        return {
            items: this.items,
            name: this.name,
            isActive: this.isActive,
            roles: this.roles,
        }
    }

}
