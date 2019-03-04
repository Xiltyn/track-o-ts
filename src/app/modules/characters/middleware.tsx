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
            const ownersCharacters = await firebaseDb.collection('characters').where(`roles.${uid}`, '==', 'owner').get();

            if(ownersCharacters) {
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

        firebaseDb.collection('characters').where(`roles.${uid}`, '==', 'owner').onSnapshot((snapshot) => {
            let payload = getState().characters.all;

            snapshot.forEach(character => {
                console.log('character_id', character.id);
                if(payload) payload = [ ...payload.filter(el => el.id !== character.id), new CharacterModel({
                    ...character.data() as ICharacterModel,
                    id: character.id,
                }) ];
            });

            dispatch(CharactersActions.setCharacters({
                all: payload,
            }))
        });
    };

    static updateCharacter = (updatedCharacter:CharacterModel) => (dispatch:Dispatch) => {
        console.log(updatedCharacter);
        firebaseDb.collection('characters').doc(updatedCharacter.id).set(updatedCharacter.plainData).then().catch(err => console.log(err));
    };

    static addCharacter = (character:ICharacterModel) => (dispatch:Dispatch, getState:() => RootState) => {
        const user = getState().auth.user;
        const uid = user && user.uid;

        console.log('addCharacter payload :: ', character);

        if(uid) {
            firebaseDb.collection('characters').add({
                ...character,
                roles: {
                    [uid]: 'owner',
                }
            })
        }
    }
}
