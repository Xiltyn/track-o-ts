import { Dispatch } from "redux";
import { IMonsterModel, MonsterModel } from "app/models/MonsterModel";
import { MonstersActions } from "app/modules/monsters/actions";
import { RootState } from "app/modules";

export class MonstersMiddleware {

    public static fetchMonsters = () => async (dispatch:Dispatch) => {
        try {
            const _DATA = await require('../../../assets/static/srd_5e_monsters.json');
            const payload = _DATA.data.map((el:IMonsterModel) => new MonsterModel(el));

            dispatch(MonstersActions.setMonsters({
                all: payload,
            }))


        } catch (e) {
            console.error(e);
        }
    };

    public static setActiveMonster = (monsterId:string) => (dispatch:Dispatch, getState:() => RootState) => {
        const currentMonsters = getState().monsters.all;
        const monsterToEdit = currentMonsters && currentMonsters.find(monster => monster.id === monsterId);
        let payload:MonsterModel[] = [];

        if(monsterToEdit && currentMonsters) {
            const newMonster = new MonsterModel(monsterToEdit.plainData);
            newMonster.active = true;

            payload.push(newMonster);

            console.log(monsterToEdit.plainData);
            console.log(newMonster);

            for(let monster of currentMonsters.filter(monster => monster.id !== monsterId)) {
                if(monster.isActive) {
                    newMonster.active = false;
                }

                payload.push(monster);
            }

            dispatch(MonstersActions.setMonsters({ all: payload }));
        }
    };

    public static setInactiveMonster = (monsterId:string) => (dispatch:Dispatch, getState:() => RootState) => {
        const currentMonsters = getState().monsters.all;
        const monsterToEdit = currentMonsters && currentMonsters.find(monster => monster.id === monsterId);
        let payload:MonsterModel[] = [];

        if(monsterToEdit && currentMonsters) {
            const newMonster = new MonsterModel(monsterToEdit.plainData);
            newMonster.active = false;

            payload = [ newMonster, ...currentMonsters.filter(monster => monster.id !== monsterId) ];

            dispatch(MonstersActions.setMonsters({ all: payload }));
        }


    }

}
