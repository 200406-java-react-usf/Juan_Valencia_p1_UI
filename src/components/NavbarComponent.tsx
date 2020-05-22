import React, { useState } from 'react';
import { Link, BrowserRouter, Redirect } from 'react-router-dom';
import { makeStyles, List, ListItem, Typography, ListItemText } from '@material-ui/core';
import { Employee } from '../models/employee';
import {checkout} from '../remote/admin-service'

export interface INavbarProps {
    authUser: Employee;
    authRole: string;
    setLogout: (user: any) => void
}

const useStyles = makeStyles({
    link: {
        textDecoration: "none",
        color: "black"
    }
});



const NavbarComponent = (props: INavbarProps) => {

    const classes = useStyles();

    let checkAdmin = (authrole: string) => {
        if(authrole === 'admin'){
            return (
                
                <ListItemText inset>
                <Typography color="inherit" variant="h6">
                    <Link to="/user" className={classes.link}>Users</Link>
                </Typography>
            </ListItemText>
        
            );
        }
        else {
            return;
        }
    }

    let checkFm = (authrole: string) => {
        if(authrole === 'finance manager'){
            return (
                <>
                <ListItemText inset>
                <Typography color="inherit" variant="h6">
                    <Link to="/reimbursements" className={classes.link}>Reimbursements</Link>
                </Typography>
        </ListItemText>
        </>
            );
        }
        else {
            return;
        }
    }

    let checkUser = (authrole: string) => {
        if(authrole === 'user'){
            return (
                <>
                <ListItemText inset>
                <Typography color="inherit" variant="h6">
                    <Link to="/UserReimbs" className={classes.link}>My Reimbursements</Link>
                </Typography>
        </ListItemText>
        </>
            );
        }
        else {
            return;
        }
    }

    let logout = async () => {
        console.log('loggin out');
        props.setLogout(null);
        await checkout();
        localStorage.clear();
    }

    let checklogin = (username : string) => {
        if (username) {
            return (
                <ListItemText inset>
                    <Typography color="inherit" variant="h6">
                        <Link to="/logout" className={classes.link} onClick={logout}>Logout</Link>
                    </Typography>
                </ListItemText>
            );
        }
        else {
            return (
                <ListItemText inset>
                    <Typography color="inherit" variant="h6">
                        <Link to="/login" className={classes.link}>Login</Link>
                    </Typography>
                </ListItemText>
            );
        }
    

}

    return(
        <>
            <List component="nav">
                <ListItem component="div">
                    <Typography color="inherit" variant="h4">ERS</Typography>
                    <ListItemText inset>
                        <Typography color="inherit" variant="h6">
                            <Link to="/home" className={classes.link}>Home</Link>
                        </Typography>
                    </ListItemText>
                    {checkUser(props.authRole)}
                    {checkFm(props.authRole)}
                    {checkAdmin(props.authRole)}
                    {checklogin(props.authUser?.username)}
                    <ListItemText inset>
                        <Typography color="inherit" variant="h6" >
                            <span className={classes.link} >{props.authUser?.username}</span>
                        </Typography>
                    </ListItemText>
                </ListItem>
            </List>
        </>
    )
}

export default NavbarComponent;