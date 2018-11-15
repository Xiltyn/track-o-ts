import * as React from 'react';
import { shallow } from 'enzyme';
import { Header } from './../Header';

const wrapper = shallow(<Header
        logout={ () => console.log('logged out') }
        toggleSidebar={ () => console.log('sidebar toggled') }/>
);

describe('<|:===== <Header /> =====:|>', () => {
    it('renders component', () => {
        expect(wrapper).toMatchSnapshot();
    });
});

