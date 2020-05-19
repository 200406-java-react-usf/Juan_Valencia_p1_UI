import React from 'react';
import { makeStyles } from '@material-ui/core';

interface ILogoutProps {

}

const useStyles = makeStyles({
    logoutContainer: {
        display: "flex",
        justifyContent: "center",
        margin: 20,
        marginTop: 40,
        padding: 20
    }
})

const LogoutComponent = (props: ILogoutProps) => {

    const classes = useStyles();

    return(
        <>
        <div className={classes.logoutContainer}>Logged Out Succesfully.</div>
        </>
    );
}

export default LogoutComponent;