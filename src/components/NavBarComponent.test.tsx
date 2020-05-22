import * as React from 'react';
import { shallow, mount, ReactWrapper } from 'enzyme';
import NavbarComponent, { INavbarProps } from './NavbarComponent';
import { Employee } from '../models/employee';
import { ListItemText } from '@material-ui/core';

const props: INavbarProps = {
    authUser: new Employee(0,'','','','','',''),
    authRole: '',
    setLogout: jest.fn()
}


describe('<NavBarComponent />', () => {


    describe('Rendered Form', () => {

        it('Renders without an error', () => {
            const wrapper = shallow(<NavbarComponent {...props} />);
            expect(wrapper.exists()).toBeTruthy();
        });

        it('Renders 3 div component if role is an empty string', () => {
            const wrapper = mount(<NavbarComponent {...props}/>);
            expect(wrapper.find(ListItemText)).toHaveLength(3);
        });

        it('Renders 4 div component if role is admin', () => {
            props.authRole = 'admin';
            const wrapper = mount(<NavbarComponent {...props}/>);
            
            expect(wrapper.find(ListItemText)).toHaveLength(4);
        });

        it('Renders 4 div component if role is finance manager', () => {
            props.authRole = 'finance manager';
            const wrapper = mount(<NavbarComponent {...props}/>);
            
            expect(wrapper.find(ListItemText)).toHaveLength(4);
        });

        it('Renders 4 div component if role is user', () => {
            props.authRole = 'user';
            const wrapper = mount(<NavbarComponent {...props}/>);
            
            expect(wrapper.find(ListItemText)).toHaveLength(4);
        });
    })
})