import React from 'react';
import { Redirect } from 'react-router-dom';
import { Employee } from '../models/employee';
import { Typography, 
    Table, 
    TableBody, 
    TableHead, 
    TableRow, 
    TableCell, 
    makeStyles, 
    TableContainer, 
    Paper } from '@material-ui/core';

interface IHomeProps {
    username: string;
    newEmployee: Employee;
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
                            <Table>
                            <TableHead>
                                <TableRow >
                                    <TableCell >Username</TableCell>
                                    <TableCell >First Name</TableCell>
                                    <TableCell >Last Name</TableCell>
                                    <TableCell >Email</TableCell>
                                    <TableCell >Role</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody component="tbody">
                                    {registedUser(props.newEmployee)}
                                </TableBody>
                            </Table>
                            </div>
                <br/><br/>
                
            </>
    );
}

export default HomeComponent;