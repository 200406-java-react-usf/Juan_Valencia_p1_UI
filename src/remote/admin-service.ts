import { revaboardsClient } from "./revaboards-client";

export async function checkout(){
    let response = await revaboardsClient.get('/auth');
    return await response;
}

export async function addNewEmployee(username: string, password: string, firstName: string, lastName: string, email: string, role: string){
    let response = await revaboardsClient.post('/employees', {username,password,firstName,lastName,email,role})
    return await response.data;
}

export async function getEmployees(){
    let response = await revaboardsClient.get('/employees');
    return await response.data;
}

export async function deleteEmployee(empid: number){
    let response = await revaboardsClient.delete('/employees', {data: {id: empid}});
    return await response.data;
}

export async function updateEmployee(username: string, password: string, firstName: string, lastName: string, email: string){
    let response = await revaboardsClient.put('/employees', {username,password,firstName,lastName,email});
    return await response.data;
}