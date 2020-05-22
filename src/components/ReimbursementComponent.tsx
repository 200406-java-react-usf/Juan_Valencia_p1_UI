import React, { useState, useEffect, ChangeEvent } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import {  makeStyles } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import MaterialTable, { Column } from 'material-table';
import { Reimbursement } from '../models/reimbursement';
import { getReimbursements, resolveReimb } from '../remote/reimb-service';


export interface IReimbProps {
    role: string;
    authUsername: string;
}

export interface TableState {
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


/**
 * Reimbursement for finance managers to only update the status of the Reimbursements
 * @param props two properties are passed role to check if this role is allowed and username to use for updating Reimb 
 */
function ReimbComponent(props: IReimbProps) {

    const classes = useStyles();
    const history = useHistory();
    
    const [errorMessage, setErrorMessage] = useState('');
    const [reimbursements, SetReimbursements] = useState([new Reimbursement(0,0,'','','','','','','')]);
    
    const [state] = useState<TableState>({
        columns: [
          { title: 'Id', field: 'reimbId', editable: 'never'},
          { title: 'Amount', field: 'amount', editable: 'never', type: 'currency', cellStyle: {textAlign: 'left'} },
          { title: 'Submitted (Time)', field: 'submitted' , editable: 'never', type: 'datetime'},
          { title: 'Resolved (Time)', field: 'resolved', editable: 'never', type: 'datetime'},
          { title: 'Description', field: 'description' , editable: 'never'},
          { title: 'Author', field: 'author' , editable: 'never'},
          { title: 'Resolver', field: 'resolver', editable: 'never' },
          { title: 'Reimb. Status', field: 'status', editComponent:((props) => 
          (<select value={props.value || ''} onChange={e => props.onChange(e.target.value)} >
            <option value={'Denied'}>Denied</option>
            <option value={'Pending'}>Pending</option>
            <option value={'Approved'}>Approved</option>
            </select>)) },
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

    /**
     * Call a request to GET All Reimbursements and set the array of Reimbursements to Reimbursement. 
     */
    let getData = async() => {
        try{
            let result = await getReimbursements();
            SetReimbursements(result);
        }
        catch(e){
            setErrorMessage(e.response.data.reason && 'Table is empty');
        }
        
    }

    /**
     * Call a request to Update a specific Reimbursement and re-render the table.
     * @param updatedData a Reimbursement Object use to grab status and id
     * @param oldstatus old status of the record validate already proccessed reimbursements
     */
    let updateData = async(updatedData: Reimbursement, oldstatus: string | undefined) => {
        try {
            
            if(oldstatus === 'Denied' || oldstatus === 'Approved'){
                setErrorMessage('This Reimbursement was already resolved');
            }
            else{
                let result = await resolveReimb(updatedData.status, props.authUsername, updatedData.reimbId);
            console.log(result);
            }
            


            getData();
        }
        catch (e) {
            setErrorMessage(e.response.data.reason);
        }
    }

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
                            onRowUpdate: (newData,oldData) =>
                                new Promise((resolve) => {
                                    updateData(newData, oldData?.status);
                                    resolve();

                                })
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