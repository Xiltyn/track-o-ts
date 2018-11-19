import { EncounterModel, EncounterModelProps } from "app/models/EncounterModel";

const encountersData:Array<EncounterModelProps> = [
    {
        id: 0,
        name: 'Bandit Slavers',
        isActive: false,
        items: [
            {
                id: 0,
                name: 'Rogue | Bandit',
                color: 'sea',
                position: 1,
                statuses: [],
            },
            {
                id: 1,
                name: 'Archer | Bandit',
                color: 'green',
                position: 2,
                statuses: [],
            },
            {
                id: 2,
                position: 3,
                color: 'primary',
                name: 'Mage | Slaver',
                statuses: [],
            }
        ],
    },
    {
        id: 1,
        name: 'Sewer Rats',
        isActive: false,
        items: [
            {
                id: 0,
                name: 'Craniun Rats | Swarm 1',
                position: 1,
                color: 'magenta',
                statuses: [],
            },
            {
                id: 1,
                name: 'Craniun Rats | Swarm 2',
                position: 2,
                color: 'blue',
                statuses: [],
            },
        ],
    },
];

export const getMockEncounters = ():Array<EncounterModel> => {
    let result:Array<EncounterModel> = [];

    for(let encounter of encountersData) {
        result = [ ...result, new EncounterModel(encounter) ]

    }

    console.log(result);

    return result;
};
