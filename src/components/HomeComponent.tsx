import React from 'react';
import { Redirect } from 'react-router-dom';
import { Employee } from '../models/employee';
import { Typography,
    TableRow, 
    TableCell, 
    makeStyles } from '@material-ui/core';

interface IHomeProps {
    username: string;
    newEmployee: Employee;
    role: string;
}

const useStyles = makeStyles({
    tableContainer: {
        display: "block",
        justifyContent: "center",
        marginLeft: "auto",
        width: "67%"
    },
    welcome: {
        justifyContent: "center",
        display: "flex"

    }
})

const HomeComponent = (props: IHomeProps) => {

    const classes = useStyles();

    let registedUser = (newemp: Employee) =>{
        if(!newemp){
            return(
                <TableRow></TableRow>
            );
        }
        else {
            return(
                <TableRow>
                    <TableCell>{props.newEmployee.username}</TableCell>
                    <TableCell>{props.newEmployee.firstName}</TableCell>
                    <TableCell>{props.newEmployee.lastName}</TableCell>
                    <TableCell>{props.newEmployee.email}</TableCell>
                    <TableCell>{props.newEmployee.role}</TableCell>
                </TableRow>
            );
        }
    }

    return(
        !props.username ?
            <Redirect to="/login" /> :
            <>
                <h1 className={classes.welcome}>
                    Welcome, {props.username}!
                </h1>
                    <div style={{margin: "auto", display: "block", width: "50%"}}>
                        
                            </div>
                <br/><br/>
                
            </>
    );
}

export default HomeComponent;