import { Dispatch } from "redux";
import { CharactersActions } from "app/modules/characters/actions";
import { RootState } from "app/modules";
import { CharacterModel, ICharacterModel } from "app/models/CharacterModel";
import { firebaseDb } from "app/shared/firebase.config";

export class CharactersMiddleware {

    static fetchCharacters = () => async (dispatch:Dispatch, getState:() => RootState) => {
        const user = getState().auth.user;
        const uid = user && user.uid;

        try {
            const ownersCharacters = await firebaseDb.collection('characters').where(`roles.${ uid }`, '==', 'owner')
                .get();

            if (ownersCharacters) {
                const payload:CharacterModel[] = [];
                ownersCharacters.forEach(snapshot => payload.push(new CharacterModel({
                    ...snapshot.data() as any,
                    id: snapshot.id,
                })));

                console.log(payload);
                dispatch(CharactersActions.setCharacters({
                    all: payload,
                }))
            }

        } catch (err) {
            console.log(err);
        }
    };

    static initCharactersListener = () => (dispatch:Dispatch, getState:() => RootState) => {
        const user = getState().auth.user;
        const uid = user && user.uid;

        firebaseDb.collection('characters').where(`roles.${ uid }`, '==', 'owner').onSnapshot((snapshot) => {
            let payload = getState().characters.all;

            snapshot.forEach(character => {
                console.log('character_id', character.id);
                if (payload) payload = [ ...payload.filter(el => el.id !== character.id), new CharacterModel({
                    ...character.data() as ICharacterModel,
                    id: character.id,
                }) ];
            });

            dispatch(CharactersActions.setCharacters({
                all: payload,
            }))
        });
    };

    static setCharacterActive = (characterId:string) => (dispatch:Dispatch, getState:() => RootState) => {
        const currentCharacters:CharacterModel[]|undefined = getState().characters.all;

        if (currentCharacters) {
            const characterToUpdate:CharacterModel|undefined = currentCharacters && currentCharacters.find(
                chara => chara.id === characterId);
            const activeCharacter = currentCharacters && currentCharacters.find(chara => chara.isActive === true && chara.id !== characterId);

            const payload:CharacterModel[] = currentCharacters.filter(chara => characterToUpdate && chara.id !== characterToUpdate.id || activeCharacter && chara.id !== activeCharacter.id);

            if(characterToUpdate) {
                const newChara = new CharacterModel(characterToUpdate);
                newChara.setActive = !newChara.isActive;

                console.log(newChara);

                payload.push(newChara);
                CharactersMiddleware.updateCharacter(newChara);
            };

            if(activeCharacter) {
                const newChara = new CharacterModel(activeCharacter);
                newChara.setActive = false;

                console.log(newChara);

                payload.push(newChara);
                CharactersMiddleware.updateCharacter(newChara);
            }
        }
    };

    static updateCharacter = (updatedCharacter:CharacterModel) => {

        firebaseDb.collection('characters').doc(updatedCharacter.id).set(updatedCharacter.plainData).then()
            .catch(err => console.log(err));
    };

    static addCharacter = (character:ICharacterModel) => (dispatch:Dispatch, getState:() => RootState) => {
        const user = getState().auth.user;
        const uid = user && user.uid;

        console.log('addCharacter payload :: ', character);

        if (uid) {
            firebaseDb.collection('characters').add({
                ...character,
                roles: {
                    [ uid ]: 'owner',
                }
            })
        }
    }
}
