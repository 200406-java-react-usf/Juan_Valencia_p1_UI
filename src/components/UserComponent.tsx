import React, { useState, createRef } from 'react';
import { Employee } from '../models/employee';
import { Redirect } from 'react-router-dom';
import  MaterialTable, { Column } from 'material-table';
import { getEmployees, deleteEmployee } from '../remote/auth-service';
import { Button } from '@material-ui/core';

interface IUserProps {
    authAdmin: string;
}

interface TableState{
    columns: Array<Column<Employee>>;
    data: Employee[];
    
}

function UserComponent(props: IUserProps){

    const[users, setData] = useState([new Employee(0,'','','','','','')]);
    const[state, setState] = useState<TableState>({
        columns: [
            {title: 'User ID', field: 'userId'},
            {title: 'Username', field: 'username'},
            {title: 'First Name', field: 'firstName'},
            {title: 'Password', field: 'password'},
            {title: 'Last Name', field: 'lastName'},
            {title: 'Email', field: 'email'},
            {title: 'Role', field: 'role'}
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

    let deleterow = async(id: number) => {
        
        try{
            console.log(id)
            let res = await deleteEmployee(id);
            console.log(res);
    }
        catch(e){
            console.log(e.response.data.reason);
        }
    }

    let tableRef = createRef();


    return(
        !checkAdmin(props.authAdmin) ?
        <Redirect to="/home" /> :
        <>
            {/* <Button onClick={getData} variant="contained" color="primary" size="medium">Get Users</Button>   */}
            <MaterialTable
      title="Users"
      tableRef={tableRef}
      columns={state.columns}
      data={users}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });

          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            
          }),
        onRowDelete: async (oldData) => {
            await deleterow(oldData.userId);
          new Promise((resolve) => {
              
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            
          })},
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
        </>
    );
}

export default UserComponent;