import * as React from 'react';
import { shallow, mount, ReactWrapper } from 'enzyme';
import LogoutComponent, { ILogoutProps } from './LogoutComponent';

const props: ILogoutProps = {
    //@ts-ignore
    authUser: null as Employee,
    setAuthUser: jest.fn()
}

describe('<LogoutComponent />', () => {

    describe('Rendered Form', () => {

        it('Renders without an error', () => {
            const wrapper = shallow(<LogoutComponent {...props} />)
            expect(wrapper.exists()).toBeTruthy();
        });

        it('Renders 1 div component', () => {
            const wrapper = mount(<LogoutComponent {...props}/>);
            expect(wrapper.find('div')).toHaveLength(1);
        });

    });


});