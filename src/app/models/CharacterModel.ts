export interface ICharacterModel {
    [ key:string ]:((...args:any) => CharacterModel|boolean|undefined)|number|boolean|string|CharacterClass|ICharacterModel|undefined;

    id?:string;
    name:string;
    class?:CharacterClass;
    campaignId:string;
    hp?:number;
    ac?:number;
}

export type CharacterClass =
    'barbarian'
    |'bard'
    |'cleric'
    |'rogue'
    |'ranger'
    |'wizard'
    |'sorcerer'
    |'warlock'
    |'paladin'
    |'fighter'
    |'monk'
    |'druid';

export const classes:{ id:number, name:CharacterClass, label:string }[] = [
    {
        id: 0,
        name: 'barbarian',
        label: 'Barbarian',
    },
    {
        id: 1,
        name: 'bard',
        label: 'Bard',
    },
    {
        id: 2,
        name: 'cleric',
        label: 'Cleric',
    },
    {
        id: 3,
        name: 'rogue',
        label: 'Rogue',
    },
    {
        id: 4,
        name: 'ranger',
        label: 'Ranger',
    },
    {
        id: 5,
        name: 'wizard',
        label: 'Wizard',
    },
    {
        id: 6,
        name: 'sorcerer',
        label: 'Sorcerer',
    },
    {
        id: 7,
        name: 'warlock',
        label: 'Warlock',
    },
    {
        id: 8,
        name: 'paladin',
        label: 'Paladin',
    },
    {
        id: 9,
        name: 'fighter',
        label: 'Fighter',
    },
    {
        id: 10,
        name: 'monk',
        label: 'Monk',
    },
    {
        id: 11,
        name: 'druid',
        label: 'Druid',
    }
];

export interface CharactersModel {
    all:Array<CharacterModel>|undefined,
}

export class CharacterModel implements ICharacterModel {
    [ key:string ]:((...args:any) => CharacterModel|boolean|undefined)|number|boolean|string|CharacterClass|ICharacterModel|undefined;

    id?:string = '';
    public name:string = '';
    public class?:CharacterClass = undefined;
    public campaignId:string = '';
    public hp?:number = 0;
    public ac?:number = 10;

    public constructor(data:ICharacterModel) {
        this.assignData(data);
    };

    private assignData = (data:ICharacterModel):CharacterModel => {
        const thisKeys = Object.keys(this);

        for (let key of thisKeys) {
            if (data[ key ]) {
                this[ key ] = data[ key ];
            }
        }

        return this;
    };

    public get plainData():ICharacterModel {
        return {
            id: this.id,
            name: this.name,
            campaignId: this.campaignId,
            class: this.class,
            hp: this.hp,
            ac: this.ac,
        }
    }

}
