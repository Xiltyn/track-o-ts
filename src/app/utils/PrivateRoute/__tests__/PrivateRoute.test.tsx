import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import configureStore, { MockStore } from 'redux-mock-store';
import { PrivateRoute } from "../PrivateRoute";

describe('<|:===== <PrivateRoute /> =====:|>', () => {
    const mockStore = configureStore();
    const initialState = {
        auth: {
            isAuthenticated: false,
            isBusy: false,
            user: {},
        }
    };
    let wrapper:ShallowWrapper<PrivateRoute.Props>;
    let store:MockStore;

    beforeEach(() => {
        // Initializes shallow render of tested Component with mocked redux store
        store = mockStore(initialState);
        wrapper = shallow(<PrivateRoute store={ store }/>);
    });

    it('renders component', () => {
        // Compares Component snapshot with previously taken snapshot to check for unexpected data changes
       expect(wrapper).toMatchSnapshot();
   });

    it('isAuthenticated matches initialState', () => {
        // Checks whether initialState.isAuthenticated matches Component.props
      expect(wrapper.prop('isAuthenticated')).toEqual(initialState.auth.isAuthenticated);
    });

    it('isBusy matches initialState', () => {
        // Checks whether initialState.isBusy matches Component.props
        expect(wrapper.prop('isBusy')).toEqual(initialState.auth.isBusy);
    })

});
