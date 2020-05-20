import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, List, ListItem, Typography, ListItemText } from '@material-ui/core';
import { Employee } from '../models/employee';
import {checkout} from '../remote/auth-service'

interface INavbarProps {
    authUser: Employee;
    authRole: string;
    setLogout: (user: any) => void
}

const useStyles = makeStyles({
    link: {
        textDecoration: "none",
        color: "black"
    },
    root: {
        textDecoration: "none",
        color: "black",
        margin: "auto", 
        display: "block",
        alignItems: "right"
    }
});



const NavbarComponent = (props: INavbarProps) => {

    const classes = useStyles();


    let checkAdmin = (authrole: string) => {
        if(authrole === 'admin'){
            return (
                <>
                <ListItemText inset>
                        <Typography color="inherit" variant="h6">
                            <Link to="/register" className={classes.link}>Register</Link>
                        </Typography>
                </ListItemText>
                <ListItemText inset>
                <Typography color="inherit" variant="h6">
                    <Link to="/user" className={classes.link}>Users</Link>
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
                    <Typography color="inherit" variant="h5">Reimbursements</Typography>
                    <ListItemText inset>
                        <Typography color="inherit" variant="h6">
                            <Link to="/home" className={classes.link}>Home</Link>
                        </Typography>
                    </ListItemText>
                    {checkAdmin(props.authRole)}
                    {checklogin(props.authUser?.username)}
                    <br/>
                    <br/>
                    <ListItemText inset>
                        <Typography color="inherit" variant="h6" >
                            <span >{props.authUser?.username}</span>
                        </Typography>
                    </ListItemText>
                </ListItem>
            </List>
        </>
    )
}

export default NavbarComponent;