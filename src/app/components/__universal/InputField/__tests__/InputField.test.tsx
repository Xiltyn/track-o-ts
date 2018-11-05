import * as React from 'react';
import { InputField } from '../InputField';
import { shallow, ShallowWrapper } from "enzyme";

describe('<|:===== <InputField /> =====:|>', () => {
    const wrapper:ShallowWrapper<InputField.Props> = shallow(
        <InputField
            name='fake_name'/>
    );

    it('renders component', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
