import React, { useState } from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import LoginComponent from './components/LoginComponent';
import HomeComponent from './components/HomeComponent';
import NavbarComponent from './components/NavbarComponent';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import ReimbComponent from './components/ReimbursementComponent';
import { Employee } from './models/employee';
import LogoutComponent from './components/LogoutComponent';
import UserComponent from './components/UserComponent';
import UserReimbComponent from './components/UserReimbursementComponent';

function App() {
  // @ts-ignore
  const [authUser, setAuthUser] = useState(null as Employee);


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
        <Route path="/home" render={() => <HomeComponent username={authUser?.username} role={authUser?.role} /> } />
        <Route path="/login" render={() => <LoginComponent authUser={authUser} setAuthUser={setAuthUser} /> } />
        <Route path="/reimbursements" render={() => <ReimbComponent authUsername={authUser?.username} role={authUser?.role} /> } />
        <Route path="/UserReimbs" render={() => <UserReimbComponent authId={authUser?.userId} authUsername={authUser?.username} role={authUser?.role} /> } />
        <Route path="/user" render={() => <UserComponent authAdmin={authUser?.role} /> } />
        <Route path="/logout" render={() => <LogoutComponent />} />
      </Switch>
    </Router>

    
    
    </>
  );
}

export default App;
