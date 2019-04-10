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
                ac: 1,
                hp: 1,
                isActive: true,
                roll: 15,
                statuses: [],
            },
            {
                id: 1,
                name: 'Archer | Bandit',
                color: 'green',
                ac: 1,
                hp: 1,
                isActive: false,
                roll: 10,
                statuses: [],
            },
            {
                id: 2,
                color: 'primary',
                ac: 1,
                hp: 1,
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
                ac: 1,
                hp: 1,
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
                ac: 1,
                hp: 1,
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

    return result;
};
