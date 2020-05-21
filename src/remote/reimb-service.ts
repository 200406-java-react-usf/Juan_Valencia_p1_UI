import { revaboardsClient } from "./revaboards-client";

export async function getReimbursements(){
    let response = await revaboardsClient.get('/reimb/fm');
    return await response.data;
}

export async function resolveReimb(status: string, resolver: string, reimbId: number){
    let response = await revaboardsClient.put('/reimb/fm',{status,resolver,reimbId});
    return await response.data;
}

export async function getReimbByAuthor(id: number){
    let response = await revaboardsClient.get(`/reimb/employee/${id}`);
    console.log(response.data);
    return await response.data;
}

export async function updateReimb(amount: number, description: string, reimbType: string, reimbId: number){
    let response = await revaboardsClient.put('/reimb/employee', {amount, description, reimbType, reimbId})
    console.log(response.data);
    return await response.data;
}

export async function addReimb(amount: number, description: string, author: string, reimbType: string,){
    let response = await revaboardsClient.post('/reimb/employee', {amount,description,author,reimbType})
    return await response.data;
}