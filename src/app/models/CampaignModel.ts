import { IUserRoles } from "app/models/UserRoles";
import { funcOptions } from "app/models/general.types";
import { CharacterModel, ICharacterModel } from "./CharacterModel";

export interface ICampaignModel {
    [key:string]:any;
    id?:string;
    name:string;
    encounters:string[];
    description?:string;
    characters?:CharacterModel[];
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
    public characters:CharacterModel[] = [];
    public isActive:boolean = false;

    constructor(data:ICampaignModel) {
        this.assignData(data);

        this.removeCharacter = this.removeCharacter.bind(this);
    }

    private assignData = (data:ICampaignModel, options?:funcOptions) => {
        const thisKeys = Object.keys(this);

        for(let key of thisKeys) {
            if(data[ key ] !== this[ key ]) {
                this[ key ] = data[ key ];

                if(key === 'characters') {
                    const charactersData = data[ key ] as ICharacterModel[];
                    this.characters = charactersData ? charactersData.map(data => new CharacterModel(data)) : []
                }
            }
        }
    };

    public get plaintData() {
        return {
            id: this.id,
            name: this.name,
            encounters: this.encounters,
            players: this.players,
            characters: this.characters.length ? this.characters.map(chara => chara.plainData) : [],
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

    public set setCharacters(characters:CharacterModel[]) {
        this.characters = characters;
    }

    public removeCharacter(characterName:string):this {
        this.characters = this.characters.filter(chara => chara.name !== characterName);

        return this;
    }
}
