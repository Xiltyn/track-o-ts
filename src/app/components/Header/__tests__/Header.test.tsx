import * as React from 'react';
import { shallow } from 'enzyme';
import { Header } from './../Header';

const wrapper = shallow(<Header
    logotype={ require('assets/images/DND_LOGO.png') }
    message='Welcome to Dev&Deliver boilerplate for React apps with TypeScript!'/>
);

describe('<|:===== <Header /> =====:|>', () => {
    it('renders component', () => {
        expect(wrapper).toMatchSnapshot();
    });
});

