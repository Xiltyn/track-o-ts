import svg from "app/utils/svg";
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
                position: 1,
                statuses: [
                    {
                        id: 0,
                        color: '#F15025',
                        icon: svg.conditions.candle,
                    },
                    {
                        id: 1,
                        color: '#DB5461',
                        icon: svg.conditions.twig,
                    },
                    {
                        id: 3,
                        color: '#85CB33',
                        icon: svg.conditions.skull,
                    }
                ],
            },
            {
                id: 1,
                name: 'Archer | Bandit',
                position: 2,
                statuses: [
                    {
                        id: 0,
                        color: '#5D6278',
                        icon: svg.conditions.magical_potion,
                    },
                ],
            },
            {
                id: 2,
                position: 3,
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
                statuses: [
                    {
                        id: 0,
                        color: '#F15025',
                        icon: svg.conditions.feather,
                    },
                ],
            },
            {
                id: 1,
                name: 'Craniun Rats | Swarm 2',
                position: 2,
                statuses: [
                    {
                        id: 0,
                        color: '#5D6278',
                        icon: svg.conditions.spellbook,
                    },
                    {
                        id: 1,
                        color: '#5D6278',
                        icon: svg.conditions.scroll,
                    },
                ],
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
