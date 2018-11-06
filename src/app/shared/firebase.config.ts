import firebase from 'firebase';

const config = {
    apiKey: 'AIzaSyDJI9oqPwVGFrZVPaxV8Ohx4jv_IgCdbJU',
    authDomain: 'rack-o-aa053.firebaseapp.com',
    databaseURL: 'https://track-o-aa053.firebaseio.com',
};

export const firebaseApp = firebase.initializeApp(config);
export const firebaseAuth = firebaseApp.auth();
