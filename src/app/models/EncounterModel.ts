import { Color } from "csstype";
import { funcOptions } from "app/models/general.types";

export type EncounterModelProps = {
    [key:string]:number|string|Array<Item>,
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

export class EncounterModel {
    [key:string]:any;

    public id:number = 0;
    public name:string = '';
    public items:Array<Item> = [];

    public constructor(data:EncounterModelProps) {
        this.assignData(data);
    }

    public assignData = (data:EncounterModelProps, options?:funcOptions) => {
        const thisKeys = Object.keys(this);

        for(let key of thisKeys) {
            if(data[ key ] !== this[ key ]) {
                this[ key ] = data[ key ];
            }
        }
    }

}
