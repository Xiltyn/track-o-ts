import { EncounterModel, EncounterModelProps } from "app/models/EncounterModel";

const encountersData:Array<EncounterModelProps> = [
    {
        id: 'asdadsfrgw',
        name: 'Bandit Slavers',
        isActive: false,
        campaignId: '',
        participants: [
            {
                id: 0,
                name: 'Rogue | Bandit',
                color: 'sea',
                isActive: true,
                roll: 15,
                statuses: [],
            },
            {
                id: 1,
                name: 'Archer | Bandit',
                color: 'green',
                isActive: false,
                roll: 10,
                statuses: [],
            },
            {
                id: 2,
                color: 'primary',
                roll: 19,
                isActive: false,
                name: 'Mage | Slaver',
                statuses: [],
            }
        ],
    },
    {
        id: 'dq13df3',
        name: 'Sewer Rats',
        isActive: false,
        campaignId: '',
        participants: [
            {
                id: 0,
                name: 'Craniun Rats | Swarm 1',
                color: 'magenta',
                roll: 21,
                isActive: true,
                statuses: [],
            },
            {
                id: 1,
                name: 'Craniun Rats | Swarm 2',
                roll: 12,
                isActive: false,
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
