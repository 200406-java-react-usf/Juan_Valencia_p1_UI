import React, { useState, createRef,  useEffect } from 'react';
import { Employee } from '../models/employee';
import { Redirect } from 'react-router-dom';
import  MaterialTable, { Column } from 'material-table';
import { getEmployees, deleteEmployee, updateEmployee, addNewEmployee } from '../remote/auth-service';
import { makeStyles } from '@material-ui/core';
import {Alert} from '@material-ui/lab/';

interface IUserProps {
    authAdmin: string;
}

interface TableState{
    columns: Array<Column<Employee>>;
    data: Employee[];
    
}

const useStyles = makeStyles({
    tableContainer: {
        margin: "auto", 
        display: "block", 
        width: "80%"
    }
})


function UserComponent(props: IUserProps){

    const classes = useStyles();
    const[users, setData] = useState([new Employee(0,'','','','','','')]);
    const [errorMessage, setErrorMessage] = useState('');
    const[state] = useState<TableState>({
        columns: [
            {title: 'User ID', field: 'userId', editable: 'never'},
            {title: 'Username', field: 'username', editable: 'onAdd'},
            {title: 'First Name', field: 'firstName'},
            {title: 'Last Name', field: 'lastName'},
            {title: 'Password', field: 'password'},
            {title: 'Email', field: 'email'},
            {title: 'Role', field: 'role', editable: 'onAdd' }
        ],
        data: [],
    });

    let checkAdmin = (authRole: string) => {
        if(authRole === 'admin'){
            return true;
        }
        else {
            return false;
        }
    }

    let getData = async() => {
        let result = await getEmployees();
        setData(result);
    }

    let updateRow = async(updatedUser: Employee) => {
        try{
            if(!updatedUser.password){
                console.log("here");
                updatedUser.password = '';
            }
            let res = await updateEmployee(updatedUser.username,updatedUser.password, updatedUser.firstName,updatedUser.lastName, updatedUser.email);
            console.log(res);
            getData();

        }
        catch(e){
            setErrorMessage(e.response.data.reason);
        }
    }

    let deleterow = async(id: number) => {
        
        try{
            console.log(id);
            let res = await deleteEmployee(id);
            console.log(res);
            getData();
    }
        catch(e){
            setErrorMessage(e.response.data.reason);
        }
    }

    let persistData = async(newUser: Employee) => {
        try{
            let persistedUser = await addNewEmployee(newUser.username, newUser.password, newUser.firstName, newUser.lastName, newUser.email, newUser.role);
            console.log(persistedUser);
            getData();
        }
        catch(e){
            setErrorMessage(e.response.data.reason);
        }
    }

    let tableRef = createRef();

    useEffect(()=> {
        getData();
    }, []);

    return(
        !checkAdmin(props.authAdmin) ?
        <Redirect to="/home" /> :
        <>
            {/* <Button onClick={getData} variant="contained" color="primary" size="medium">Get Users</Button>   */}
            <div className={classes.tableContainer}>
            <MaterialTable
            style={{marginTop:40}}
      title="Users"
      tableRef={tableRef}
      columns={state.columns}
      data={users}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
              persistData(newData);  
              resolve();

          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
              resolve();
              updateRow(newData);
              console.log(newData);  
              
              
            
          }),
        onRowDelete: async (oldData) => {
            
          new Promise((resolve) => {
              
              deleterow(oldData.userId);
              resolve();
          })
        },
      }}
      actions={[
          {
            icon: 'refresh',
            tooltip: 'Refresh Data',
            isFreeAction: true,
            onClick: () => getData() && tableRef.current,
          }
      ]}
    />
    </div>
    <br/>
    <br/>
    {errorMessage ? <Alert severity="error" style={{display: "block", width: "50%"}}>{errorMessage} </Alert> : <></> }
        </>
    );
}

export default UserComponent;