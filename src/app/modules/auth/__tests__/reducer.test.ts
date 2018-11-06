import { AuthActions } from "../actions";
import { authStateMock } from "./mocks/authState.mock";
import { authReducer } from "../reducer";

describe('<|:===== Auth Reducer =====:|>', () => {
    let state = authStateMock;

    it('return the initial state', () => {
        expect(authReducer(state, { type: AuthActions.Type.ISLOGGEDIN }))
            .toEqual(state);
    });

    it(`handle ${ AuthActions.Type.REQ_DISPATCH }`, () => {
        state = {
            ...state,
            started: true,
            completed: false,
            failed: false,
        };

        expect(authReducer(state, {
            type: AuthActions.Type.REQ_DISPATCH
        })).toEqual(state);
    });

    it(`handle ${ AuthActions.Type.SIGNIN }`, () => {
        state = {
            ...state,
            started: false,
            completed: true,
            failed: false,
            user: {
                displayName: 'test user',
                email: 'test.email@mail.com',
                phoneNumber: '123456789',
                photoURL: 'http://fake.com/url.png',
                providerId: 'fake_provider',
                uid: '0123',
            }
        };

        expect(authReducer(state, {
            type: AuthActions.Type.SIGNIN,
            payload: {
                user: {
                    displayName: 'test user',
                    email: 'test.email@mail.com',
                    phoneNumber: '123456789',
                    photoURL: 'http://fake.com/url.png',
                    providerId: 'fake_provider',
                    uid: '0123',
                },
            }
        })).toEqual(state);
    });

    it(`handle ${ AuthActions.Type.REQ_FAILURE }`, () => {
        state = {
            ...state,
            started: false,
            completed: true,
            failed: true,
            statusMessage: 'Authentication Failed',
            user: null
        };

        expect(authReducer(state, {
            type: AuthActions.Type.REQ_FAILURE,
            payload: {
                user: null,
                statusMessage: 'Authentication Failed',
            }
        })).toEqual(state);
    });

});
