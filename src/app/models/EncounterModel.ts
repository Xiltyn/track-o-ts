import { Color } from "csstype";
import { funcOptions } from "app/models/general.types";

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
    position:number,
    statuses:Array<Status>,
}

export type Status = {
    id:number,
    color:Color,
    icon:JSX.Element,
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

}
