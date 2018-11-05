import { AuthActions } from "../actions";
import { authStateMock } from "./mocks/authState.mock";
import { authReducer } from "../reducer";

describe('<|:===== Auth Reducer =====:|>', () => {
    let state = authStateMock;

    it('return the initial state', () => {
        expect(authReducer(state, { type: AuthActions.Type.ISLOGGEDIN }))
            .toEqual(state);
    });

    it(`handle ${ AuthActions.Type.SIGNIN }`, () => {
        state = {
            ...state,
            started: true,
            completed: false,
            failed: false,
        };

        expect(authReducer(state, {
            type: AuthActions.Type.SIGNIN
        })).toEqual(state);
    });

    it(`handle ${ AuthActions.Type.SIGNIN_SUCCESSFUL }`, () => {
        state = {
            ...state,
            started: false,
            completed: true,
            failed: false,
            token: 'fake_token',
            user: {
                email: 'fake_email@mail.com'
            }
        };

        expect(authReducer(state, {
            type: AuthActions.Type.SIGNIN_SUCCESSFUL,
            payload: {
                user: { email: 'fake_email@mail.com' },
                token: 'fake_token',
            }
        })).toEqual(state);
    });

    it(`handle ${ AuthActions.Type.SIGNIN_FAILED }`, () => {
        state = {
            ...state,
            started: false,
            completed: true,
            failed: true,
            token: '',
            statusMessage: 'Authentication Failed',
            user: {}
        };

        expect(authReducer(state, {
            type: AuthActions.Type.SIGNIN_FAILED,
            payload: {
                user: {},
                statusMessage: 'Authentication Failed',
            }
        })).toEqual(state);
    });

});
