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

            snapshot.docChanges().forEach(change => {
                if (change.type === 'added') {
                    if (payload) {
                        payload = [ ...payload, new CharacterModel({
                            ...change.doc.data() as ICharacterModel,
                            id: change.doc.id,
                        })]
                    } else {
                        payload = [ new CharacterModel({
                            ...change.doc.data() as ICharacterModel,
                            id: change.doc.id,
                        }) ]
                    }
                } else if (change.type === 'modified') {
                    if (payload) payload = [ ...payload.filter(el => el.id !== change.doc.id), new CharacterModel({
                        ...change.doc.data() as ICharacterModel,
                        id: change.doc.id,
                    }) ];
                } else if (change.type === 'removed') {
                    if (payload) payload = payload.filter(chara => chara.id !== change.doc.id);
                }


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

                payload.push(newChara);
                CharactersMiddleware.updateCharacter(newChara);
            };

            if(activeCharacter) {
                const newChara = new CharacterModel(activeCharacter);
                newChara.setActive = false;

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

        if (uid) {
            firebaseDb.collection('characters').add({
                ...character,
                roles: {
                    [ uid ]: 'owner',
                }
            })
        }
    };

    static removeCharacter = (characterId:string) => (dispatch:Dispatch) => {
        dispatch(CharactersActions.setStatus({status:'busy'}));
        firebaseDb.collection('characters').doc(characterId).delete().then(() => {
            dispatch(CharactersActions.setStatus({status:'idle'}));
        })
            .catch(err => {
                console.log(err);
                dispatch(CharactersActions.setStatus({status:'error'}));
            });
    }
}
