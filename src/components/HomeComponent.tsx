import React from 'react';
import { Redirect } from 'react-router-dom';
import { Typography, 
    makeStyles } from '@material-ui/core';

interface IHomeProps {
    username: string;
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

    let AdminMessage = (role: string) => {
        if(role === 'admin'){
            return (
                <>
                <Typography component="body"><p>
                    Welcome to the Expense Reimbursement System(ERS), in here you are in charge of 
                    handling Employee accounts, in the navbar you will see <em>User</em> tab in which you can see all of the Employees
                    we currently have on our database. In this page you are able to Add, Edit, or Delete Employees from our database.
                    </p></Typography>
                    </>
            );
        }
    }

    let FmMessage = (role: string) => {
        if(role === 'finance manager'){
            return (
                <>
                <Typography component="body"><p>
                    Welcome to the Expense Reimbursement System(ERS), in here you are in charge of 
                    handling Employee Reimbursements, in the navbar you will see <em>Reimbursement</em> tab in which you can see all of the employees
                    reimbursements we currently have on our database. In this page you are able to Resolve the Status of the Pending reimbursements ( keep 
                    in mind that the resolved time and the resolver username will be automatically added for you).
                    </p></Typography>
                    </>
            );
        }
    }

    let EmployeeMessage = (role: string) => {
        if(role === 'user'){
            return (
                <>
                <Typography component="body"><p>
                    Welcome to the Expense Reimbursement System(ERS), in here you are able to take care your Reimbursements, in the navbar you will see 
                    <em>My Reimbursement</em> tab in which you can see all of your reimbursements. In this page you are able to add or update 
                    reimbursements if they are still pending (keep in mind that the creation time and your author username will be automatically added for you).
                    </p></Typography>
                    </>
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
                            {AdminMessage(props.role)}
                            {FmMessage(props.role)}
                            {EmployeeMessage(props.role)}
                            </div>
                <br/><br/>
                
            </>
    );
}

export default HomeComponent;