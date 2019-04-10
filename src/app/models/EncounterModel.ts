import { funcOptions } from "app/models/general.types";
import { ConditionModel, ConditionsState } from "app/models/ConditionsModel";
import { IUserRoles } from "app/models/UserRoles";

export type EncounterModelProps = {
    [key:string]:number|string|boolean|Array<Participant>|undefined,
    isActive?:boolean,
    id?:string;
    campaignId:string;
    name:string;
    participants:Array<Participant>;
}

export type Participant = {
    id:number,
    name:string,
    isActive:boolean,
    color?:string;
    roll:number;
    ac:number;
    hp:number;
    characterId?:string,
    monsterId?:string,
    statuses:ConditionsState,
}


export interface EncountersModel {
    all:EncounterModel[],
}

export class EncounterModel {
    [key:string]:any;

    public id:string = '';
    public name:string = '';
    public participants:Array<Participant> = [];
    public campaignId:string = '';
    public isActive:boolean = false;
    public roles?:IUserRoles = {};

    public constructor(data:EncounterModelProps) {
        this.assignData(data);

        if(data.isActive === undefined) this.isActive = false;

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
            if(key === 'participants' && data.items) {
                this.participants = data.items as Participant[]
            }
        }
    };

    public setActive():boolean {
        return this.isActive = true;
    }

    public setInactive():boolean {
        return this.isActive = false;
    }

    public addStatus(itemId:number, condition:ConditionModel):Array<Participant> {
        const { participants } = this;
        const itemToEdit = participants.find(item => item.id === itemId);

        if(itemToEdit) itemToEdit.statuses = [ ...itemToEdit.statuses, condition ];

        return participants;
    }

    public get plainData() {
        return {
            participants: this.participants,
            campaignId: this.campaignId,
            name: this.name,
            isActive: this.isActive,
            roles: this.roles,
        }
    }

}
