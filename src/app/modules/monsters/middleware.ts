import { Dispatch } from "redux";
import { IMonsterModel, MonsterModel } from "app/models/MonsterModel";
import { MonstersActions } from "app/modules/monsters/actions";

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

}
