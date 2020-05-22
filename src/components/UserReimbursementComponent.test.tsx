import * as React from 'react';
import { shallow } from 'enzyme';
import { Redirect } from 'react-router-dom';
import UserComponent, { IUserProps } from './UserComponent';
import UserReimbComponent, { IUserReimbProps } from './UserReimbursementComponent';

const props: IUserReimbProps = {
    role: '',
    authUsername: '',
    authId: 1
}


describe('<UserComponent />', () => {


    describe('Rendered Form', () => {

        it('Renders without an error', () => {
            const wrapper = shallow(<UserReimbComponent {...props} />);
            expect(wrapper.exists()).toBeTruthy();
        });

        it('Renders div component if role is user', () => {
            props.role = 'user';
            const wrapper = shallow(<UserReimbComponent {...props}/>);
            console.log(wrapper.debug())
            expect(wrapper.find('div')).toHaveLength(2);
        });

        it('Redirect component if role is not admin', () => {
            props.role = 'hello';
            const wrapper = shallow(<UserReimbComponent {...props}/>);
            expect(wrapper.find(Redirect)).toHaveLength(1);
        });

    });
});