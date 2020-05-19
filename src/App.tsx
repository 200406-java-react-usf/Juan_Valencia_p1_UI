import React, { useState } from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import LoginComponent from './components/LoginComponent';
import HomeComponent from './components/HomeComponent';
import NavbarComponent from './components/NavbarComponent';
import { AppBar, Toolbar, Typography, Container } from '@material-ui/core';
import RegisterComponent from './components/RegisterComponent';
import { Employee } from './models/employee';
import LogoutComponent from './components/LogoutComponent';
import UserComponent from './components/UserComponent';

function App() {
  // @ts-ignore
  const [authUser, setAuthUser] = useState(null as Employee);
  // @ts-ignore
  const [registeredEmployee, setEmployee] = useState(null as Employee);
  // @ts-ignore

  return (
    <>
    <Router>
      <AppBar color="primary" position="static">
        <Toolbar>
          <Typography variant="h5" color ="inherit">
            <NavbarComponent authUser={authUser} authRole={authUser?.role} setLogout={setAuthUser} />
          </Typography>
        </Toolbar>
        
      </AppBar>
      
      <Switch>
        <Redirect  from="/" to="/login" exact />
        <Route path="/home" render={() => <HomeComponent username={authUser?.username} newEmployee={registeredEmployee} /> } />
        <Route path="/login" render={() => <LoginComponent authUser={authUser} setAuthUser={setAuthUser} /> } />
        <Route path="/register" render={() => <RegisterComponent authAdmin={authUser?.role} registeredEmployee={registeredEmployee} setEmployee={setEmployee} /> } />
        <Route path="/user" render={() => <UserComponent authAdmin={authUser?.role} /> } />
        <Route path="/logout" render={() => <LogoutComponent />} />
      </Switch>
    </Router>

    
    
    </>
  );
}

export default App;
