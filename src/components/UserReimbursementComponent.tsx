import React, { useState, useEffect, createRef, JSXElementConstructor } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import {  makeStyles, Select, MenuItem } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import MaterialTable, { Column } from 'material-table';
import { Reimbursement } from '../models/reimbursement';
import { getReimbByAuthor, updateReimb, addReimb } from '../remote/reimb-service';


export interface IUserReimbProps {
    role: string;
    authUsername: string;
    authId: number;
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


/**
 * Reimbursement for finance managers to only update the status of the Reimbursements
 * @param props two properties are passed role to check if this role is allowed and username to use for updating Reimb 
 */
function UserReimbComponent(props: IUserReimbProps) {

    const classes = useStyles();
    
    const [errorMessage, setErrorMessage] = useState('');
    const [reimbursements, SetReimbursements] = useState([new Reimbursement(0,0,'','','','','','','')]);

    const [state] = useState<TableState>({
        columns: [
          { title: 'Id', field: 'reimbId', editable: 'never'},
          { title: 'Amount', field: 'amount', type: 'currency', cellStyle: {textAlign: 'left'} },
          { title: 'Submitted (Time)', field: 'submitted' , editable: 'never', type: 'datetime'},
          { title: 'Resolved (Time)', field: 'resolved', editable: 'never', type: 'datetime'},
          { title: 'Description', field: 'description' },
          { title: 'Author', field: 'author' , editable: 'never'},
          { title: 'Resolver', field: 'resolver', editable: 'never' },
          { title: 'Reimb. Status', field: 'status', editable: 'never' },
          { title: 'Reimb Type', field: 'reimbType', editComponent:((props)=> 
          (<Select defaultValue={'OTHER'} value={props?.value || ''} onChange={e => props.onChange(e.target.value)}>
                <MenuItem value={'LODGING'}>LODGING</MenuItem>
                <MenuItem value={'TRAVEL'}>TRAVEL</MenuItem>
                <MenuItem value={'FOOD'}>FOOD</MenuItem>
                <MenuItem value={'OTHER'}>OTHER</MenuItem>
            </Select>)) }
        ],
        data: [],
      });

    let checkUser = (authRole: string) => {
        if(authRole === 'user'){
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * Call a request to GET All Reimbursements and set the array of Reimbursements to Reimbursement. 
     */
    let getData = async(id: number) => {
        try{
            let result: Reimbursement[] = await getReimbByAuthor(id);
            console.log(result);
            SetReimbursements(result);
        }
        catch(e){
            setErrorMessage(e.response.data.reason && 'No entries');
        }
        
    }

    /**
     * Call a request to Update a specific Reimbursement and re-render the table.
     * @param updatedData a Reimbursement Object use to grab status and id
     * @param status old status of the record validate already proccessed reimbursements
     */
    let updateData = async(updatedData: Reimbursement, status: string | undefined) => {
        try {
            if(status === 'Denied' || status === 'Approved'){
                setErrorMessage('This Reimbursement was already resolved');
            }
            else{
                let result = await updateReimb(updatedData.amount, updatedData.description, updatedData.reimbType, updatedData.reimbId);
                console.log(result);
            }
            getData(props.authId);
        }
        catch (e) {
            setErrorMessage(e.response.data.reason);
        }
    }

    let addData = async(newData: Reimbursement) => {
        try{
            let result = await addReimb(newData.amount,newData.description, props.authUsername ,newData.reimbType);
            console.log(result);
            getData(props.authId);
        }
        catch(e){
            setErrorMessage(e.response.data.reason);
        }
    }

    useEffect(()=> {
        getData(props.authId);
    },[])

    let tableRef = createRef();

    return(
        
        !checkUser(props.role) ?
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

                                }),
                            onRowAdd: (newData) =>
                            new Promise((resolve) => {
                                addData(newData);
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



export default UserReimbComponent;