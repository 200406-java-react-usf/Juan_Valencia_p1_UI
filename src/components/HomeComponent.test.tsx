import * as React from 'react';
import { shallow, mount, ReactWrapper } from 'enzyme';
import HomeComponent, { IHomeProps } from './HomeComponent';

const props: IHomeProps = {
    username: 'test',
    role: ''
}


describe('<HomeComponent />', () => {


    describe('Rendered Form', () => {

        it('Renders without an error', () => {
            const wrapper = shallow(<HomeComponent {...props} />);
            expect(wrapper.exists()).toBeTruthy();
        });

        it('Renders 1 div component if role is an empty string', () => {
            const wrapper = mount(<HomeComponent {...props}/>);
            expect(wrapper.find('div')).toHaveLength(1);
        });

        it('Renders 2 div component if role is admin', () => {
            props.role = 'admin';
            const wrapper = mount(<HomeComponent {...props}/>);
            
            expect(wrapper.find('div')).toHaveLength(2);
        });

        it('Renders 2 div component if role is finance manager', () => {
            props.role = 'finance manager';
            const wrapper = mount(<HomeComponent {...props}/>);
            
            expect(wrapper.find('div')).toHaveLength(2);
        });

        it('Renders 2 div component if role is user', () => {
            props.role = 'user';
            const wrapper = mount(<HomeComponent {...props}/>);
            
            expect(wrapper.find('div')).toHaveLength(2);
        });
    })
})