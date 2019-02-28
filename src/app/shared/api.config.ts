import axios from 'axios';
import firebase from 'firebase';

export const API = {
    HELLO: {
        get: () => {
            const currentUser = firebase.auth().currentUser;
            if(currentUser !== null) {
                return currentUser.getIdToken(true).then((idToken) => {
                    const bearer = `Bearer ${idToken}`;
                    console.log(bearer);

                    if(idToken) axios.post('https://us-central1-track-o-aa053.cloudfunctions.net/validatedRequest/campaigns',{
                        name: 'test camp',
                        players: [ 'xiltyn@gmail.com' ],
                    }, {headers: {
                        'Authorization': 'Bearer ' + idToken,
                    } })
                }).catch(function(error) {
                    console.error(error);
                })
            } else return null;
        }
    }
};

