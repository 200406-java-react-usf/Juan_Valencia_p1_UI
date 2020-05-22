import * as React from 'react';
import { shallow, mount, ReactWrapper } from 'enzyme';
import { Employee } from '../models/employee';
import LoginComponent, { ILoginProps } from './LoginComponent';
import { FormControl } from '@material-ui/core';
import { authenticate } from '../remote/auth-service';

const props: ILoginProps = {
    //@ts-ignore
    authUser: null as Employee,
    setAuthUser: jest.fn()
}

describe('<LoginComponent />', () =>{

    describe('Rendered Form', ()=> {

        it('Renders without an error', () => {
            const wrapper = shallow(<LoginComponent { ...props } />)
            expect(wrapper.exists()).toBeTruthy();
            });
        
        it('Renders 2 formcontrols components', () => {
            const wrapper = mount(<LoginComponent {...props}/>);
            expect(wrapper.find(FormControl)).toHaveLength(2);
        });

        it('Renders 2 input elements', () => {
            const wrapper = mount(<LoginComponent {...props}/>);
            expect(wrapper.find('input')).toHaveLength(2);
        });

        it('Renders a button', () => {
            const wrapper = mount(<LoginComponent {...props}/>);
            expect(wrapper.find('button')).toHaveLength(1);
        });

        describe('Form field behavior', () => {
            let wrapper: ReactWrapper;
            beforeEach(() => {
                wrapper = mount(<LoginComponent {...props} />);
            })

            const setState = jest.fn();
            const useStateMock: any = (init: any) => [init, setState];
    
            it('should update #username value when change event triggered', () => {
                wrapper.find('input#username').simulate('change', {
                    target: { value: 'admin'}
                });
    
                expect(wrapper.find('input#username').prop('value'))
                    .toEqual('admin');
            });
    
            it('should update #password value when change event triggered', () => {
                wrapper.find('input#password').simulate('change', {
                    target: { value: 'password'}
                });
    
                expect(wrapper.find('input#password').prop('value'))
                    .toEqual('password');
            });
    
            // it('shouldcall prop registerAction when button is clicked', () => {
            //     // let authenticate = jest.fn();
            //     // let login = jest.fn().mockImplementation(()=>{
            //     //     authenticate = jest.fn().mockReturnValue(new Employee(0,'','','','','',''));
            //     //     props.setAuthUser(new Employee(1,'a','a','a','a','a','a'));
            //     // })

            //     wrapper.find('button').simulate('click');
    
            //     expect(props.setAuthUser).toHaveBeenCalled();
            // })

            describe('state management', () => {

                afterEach(()=> {
                    jest.clearAllMocks();
                });

        
                it('calls setState when #username changed', () => {
                    jest.spyOn(React, 'useState')
                        .mockImplementation(useStateMock);
                    const wrapper = mount(<LoginComponent {...props} />);
        
                    wrapper.find('input#username').simulate('change', {
                        target: { value: 'jdvalencia'}
                    });
        
                    expect(setState).toHaveBeenCalledWith('jdvalencia');
        
                })
        
                it('calls setState when #password changed', () => {
                    jest.spyOn(React, 'useState')
                        .mockImplementation(useStateMock);
                    const wrapper = mount(<LoginComponent {...props} />);
                    
                    wrapper.find('input#password').simulate('change', {
                        target: { value: 'password'}
                    });
        
                    expect(setState).toHaveBeenCalledWith('password');
        
                })
            })
            
        });
    });
});