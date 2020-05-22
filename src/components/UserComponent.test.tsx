import * as React from 'react';
import { shallow } from 'enzyme';
import { Redirect } from 'react-router-dom';
import UserComponent, { IUserProps } from './UserComponent';

const props: IUserProps = {
    authAdmin: ''
}


describe('<UserComponent />', () => {


    describe('Rendered Form', () => {

        it('Renders without an error', () => {
            const wrapper = shallow(<UserComponent {...props} />);
            expect(wrapper.exists()).toBeTruthy();
        });

        it('Renders div component if role is admin', () => {
            props.authAdmin = 'admin';
            const wrapper = shallow(<UserComponent {...props}/>);
            expect(wrapper.find('div')).toHaveLength(1);
        });

        it('Redirect component if role is not admin', () => {
            props.authAdmin = 'hello';
            const wrapper = shallow(<UserComponent {...props}/>);
            console.log(wrapper.debug())
            expect(wrapper.find(Redirect)).toHaveLength(1);
        });

    });
});