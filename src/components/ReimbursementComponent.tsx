import React, { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import {  Typography, makeStyles } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import MaterialTable, { Column } from 'material-table';
import { Reimbursement } from '../models/reimbursement';
import { getReimbursements } from '../remote/reimb-service';


interface IReimbProps {
    role: string;
}

interface TableState {
    columns: Array<Column<Reimbursement>>;
    data: Reimbursement[];
  }

const useStyles = makeStyles({
    reimbContainer: {
        display: "flex",
        justifyContent: "center",
        margin: 20,
        marginTop: 40,
        padding: 20
    },
    alert: {
        display: "flex",
        justifyContent: "center",
        margin: 5,
        padding: 20
    }
})



function ReimbComponent(props: IReimbProps) {

    const classes = useStyles();
    const history = useHistory();
    
    const [errorMessage, setErrorMessage] = useState('');
    const [reimbursements, SetReimbursements] = useState([new Reimbursement(0,0,'','','','','','','')]);

    const [state] = useState<TableState>({
        columns: [
          { title: 'Id', field: 'reimId', editable: 'never'},
          { title: 'Amount', field: 'amount' },
          { title: 'Submitted (Time)', field: 'submitted' , editable: 'never'},
          { title: 'Resolved (Time)', field: 'resolved', editable: 'never'},
          { title: 'Description', field: 'description' , editable: 'never'},
          { title: 'Author', field: 'author' , editable: 'never'},
          { title: 'Resolver', field: 'resolver' },
          { title: 'Reimb. Status', field: 'status' },
          { title: 'Reimb Type', field: 'reimbType' , editable: 'never'}
        ],
        data: [],
      });

    

    let checkFm = (authRole: string) => {
        if(authRole === 'finance manager'){
            return true;
        }
        else {
            return false;
        }
    }

    let getData = async() => {
        try{
            let result = await getReimbursements();
            SetReimbursements(result);
        }
        catch(e){
            setErrorMessage(e.response.data.reason && 'Table is empty');
        }
        
    }

    // let persistData = async(newReimb: Reimbursement)=> {
    //     try{
    //         let persistedUser = await addReimb();
    //         console.log(persistedUser);
    //         getData();
    //     }
    //     catch(e){
    //         setErrorMessage(e.response.data.reason);
    //     }
    // }

    useEffect(()=> {
        getData();
    },[])

    return(
        
        !checkFm(props.role) ?
            <Redirect to="/home" /> :
            <>
                <div className={classes.reimbContainer}>
                    <MaterialTable
                        title="Reimbursements"
                        columns={state.columns}
                        data={reimbursements}
                        editable={{
                            onRowUpdate: (newData) =>
                                new Promise((resolve) => {

                                    resolve();

                                }),
                            onRowDelete: (oldData) =>
                                new Promise((resolve) => {

                                    resolve();
                                }),
                        }}
                    />
                    
                </div>
                <div className={classes.alert}>
                    {errorMessage ? <Alert severity="error">{errorMessage} </Alert> : <></>}
                </div>

            </>
    );
}

export default ReimbComponent;