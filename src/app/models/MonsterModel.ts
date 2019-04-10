import uuid from 'uuid';

export interface IMonsterModel {
    [ key:string ]:any;

    id?:string|number;
    campaignId?:string;
    isActive?:boolean;
    roles?:{[key:string]:'owner'|'dm'|'player'};

    name:string;
    meta?:string;
    img_url?:string;
    actions?:string;
    stats?:{[key:string]:{value:number, modifier:number}};
    hp?:number;
    ac?:number;
    cr?:number;
    languages?:string;
    legendary_actions?:string;
    saving_throws?:string;
    senses?:string;
    speed?:string;
    skills?:string;
    traits?:string;
}

export interface MonstersModel {
    all:MonsterModel[];
    status: 'idle'|'busy'|'error';
}

export class MonsterModel implements IMonsterModel {
    [ key:string ]:any;

    public id?:string = '';
    public isActive?:boolean = false;
    public roles:{[key:string]:'owner'|'dm'|'player'} = {};

    public name:string = '';
    public hp:number = 0;
    public ac:number = 10;
    public meta?:string = '';
    public img_url?:string = '';
    public actions?:string = '';
    public stats?:{[key:string]:{value:number, modifier:number}} = {};
    public cr?:number = 0;
    public languages?:string = '';
    public legendary_actions?:string = '';
    public saving_throws?:string = '';
    public senses?:string = '';
    public speed?:string = '';
    public skills?:string = '';
    public traits?:string = '';

    public constructor(data:IMonsterModel) {
        this.assignData(data);
    };

    public assignData = (data:IMonsterModel):MonsterModel => {
        const dataKeys = Object.keys(data);

        dataKeys.map(key => {
            this.id = uuid.v4();
            if (this[ key ] && this[ key ] !== data[ key ]) {
                this[ key ] = data[ key ];
            } else if(data[ `${key}_mod` ]) {
                const value = data[ `${ key }_mod` ];
                const regexp = new RegExp(/[{()}]/g);
                const modifier = value.replace(regexp, "");

                this.stats = {
                    ...this.stats,
                    [ key ]: {
                        value: parseInt(data[ key ]),
                        modifier: parseInt(modifier),
                    }
                }
            } else {
                switch(key) {
                    case 'Armor Class': this.ac = data[key]; break;
                    case 'Hit Points': this.hp = data[key];  break;
                    case 'Saving Throws': this.saving_throws = data[key];  break;
                    case 'saving_throws': this.saving_throws = data[key];  break;
                    case 'Legendary Actions': this.legendary_actions = data[key];  break;
                    case 'legendary_actions': this.legendary_actions = data[key];  break;
                    case 'Challenge':
                        const parsed = data[key].split(' (')[0];
                        if(parsed.includes('/')) {
                            const numbers = parsed.split('/');
                            this.cr = parseInt(numbers[0]) / parseInt(numbers[1]);
                        } else {
                            this.cr = parseInt(data[key].split(' (')[0]);
                        }
                        break;
                    case 'cr': this.cr = data[key];  break;
                    case 'Actions': this.actions = data[key];  break;
                    case 'actions': this.actions = data[key];  break;
                    case 'name': this.name = data[key];  break;
                    case 'meta': this.meta = data[key];  break;
                    case 'img_url': this.img_url = data[key];  break;
                    case 'Languages': this.languages = data[key];  break;
                    case 'languages': this.languages = data[key];  break;
                    case 'Senses': this.senses = data[key];  break;
                    case 'sense': this.senses = data[key];  break;
                    case 'Speed': this.speed = data[key];  break;
                    case 'speed': this.speed = data[key];  break;
                    case 'Skills': this.skills = data[key];  break;
                    case 'skills': this.skills = data[key];  break;
                    case 'Traits': this.traits = data[key];  break;
                    case 'traits': this.traits = data[key];  break;
                }
            }
        });

        return this;
    };

    public get plainData():IMonsterModel {
        let result = {};
        const thisKeys = Object.keys(this);

        for(let key of thisKeys) {
            result = {
                ...result,
                [key]: this[key],
            }
        }

        return result as IMonsterModel;
    }

    public getComputedValue = (key:string):number => {
        if(this[ key ]) {
            const regexp = new RegExp(/[-]{0,1}[\d]*[\.]{0,1}[\d]+/g);
            const parsed = this[key].match(regexp);

            return parseInt(parsed);
        } else {
            return 0;
        }
    };

    public getCrString = (value:number):string => {
        switch (value) {
            case 0.125: return '1/8';
            case 0.25: return '1/4';
            case 0.5: return '1/2';
            default: return value.toString();
        }
    };

    public set active(value:boolean) {
        this.isActive = value;
    }
}
