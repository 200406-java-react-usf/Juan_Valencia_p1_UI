import * as React from 'react';
import { shallow } from 'enzyme';
import ReimbComponent, { IReimbProps} from './ReimbursementComponent';
import { Redirect } from 'react-router-dom';

const props: IReimbProps = {
    role: 'finance manager',
    authUsername: ''
}



describe('<ReimbComponent />', () => {


    describe('Rendered Form', () => {

        it('Renders without an error', () => {
            const wrapper = shallow(<ReimbComponent {...props} />);
            expect(wrapper.exists()).toBeTruthy();
        });

        it('Renders div component if role is finance manager', () => {
            const wrapper = shallow(<ReimbComponent {...props}/>);
            expect(wrapper.find('div')).toHaveLength(2);
        });

        it('Redirect component if role is an empty string', () => {
            props.role = '';
            const wrapper = shallow(<ReimbComponent {...props}/>);
            expect(wrapper.find(Redirect)).toHaveLength(1);
        });

    });
});