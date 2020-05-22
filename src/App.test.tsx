import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import NavbarComponent from './components/NavbarComponent';
import { mount, shallow } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';
import HomeComponent, { IHomeProps } from './components/HomeComponent';
import { Switch } from '@material-ui/core';

const props: IHomeProps = {
  username: '',
  role: ''
}

describe('<App />', () => {

  test('renders the app without crashing', () => {
    const app = render(<App />);
    //const linkElement = getByText(/learn react/i);
    expect(app).toBeTruthy();
  });

  test('Renders NavBarComponent', () => {
    //Testing wrapper around the rendered component
    //The wrapper exposes accesors to the rendered compoenent for testing
    const wrapper = mount(<App />);

    expect(wrapper.find(NavbarComponent)).toHaveLength(1);

  })

  // test('valid path should redirect to login', () => {


  //   const component = mount(
  //     <MemoryRouter initialEntries={[ '/' ]}>
  //       <App />
  //     </MemoryRouter>
  //   );
  //   console.log(component.debug());
  //   expect(component.find(<HomeComponent {...props}/>)).toHaveLength(1);
  // });

})
