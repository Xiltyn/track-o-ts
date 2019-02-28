import { IUserRoles } from "app/models/UserRoles";
import { funcOptions } from "app/models/general.types";

export interface ICampaignModel {
    [key:string]:any;
    id?:string;
    name:string;
    encounters:string[];
    description?:string;
    roles?:IUserRoles;
    players?:string[];
    isActive?:boolean;
}

export interface CampaignsModel {
    all: CampaignModel[],
}

export class CampaignModel implements ICampaignModel {
    // INDEXER
    [key:string]:any;

    public id:string = '';
    public name:string = '';
    public description?:string = '';
    public encounters:string[] = [];
    public players:string[] = [];
    public roles:IUserRoles = {};
    public isActive:boolean = false;

    constructor(data:ICampaignModel) {
        this.assignData(data);
    }

    private assignData = (data:ICampaignModel, options?:funcOptions) => {
        const thisKeys = Object.keys(this);

        for(let key of thisKeys) {
            if(data[ key ] !== this[ key ]) {
                this[ key ] = data[ key ];
            }
        }
    };

    public set setEncounters(encounterIdArr:number[]) {
        this.numbers = encounterIdArr;
    }

    public set removeEncounter(encounterId:string) {
        const newEncounters = this.encounters.filter(encounter => encounter !== encounterId);

        this.encounters = newEncounters;
    }

    public get plaintData() {
        return {
            id: this.id,
            name: this.name,
            encounters: this.encounters,
        }
    }

    public get userRoles() {
        return {
            roles: this.roles,
        }
    }

    public setActive():boolean {
        return this.isActive = true;
    }

    public setInactive():boolean {
        return this.isActive = false;
    }
}
