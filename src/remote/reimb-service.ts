import { revaboardsClient } from "./revaboards-client";

export async function getReimbursements(){
    let response = await revaboardsClient.get('/reimb/fm');
    return await response.data;
}

// export async function addReimb(amount: number, description: string, author: string, lastName: string, email: string, role: string){
//     let response = await revaboardsClient.post('/employees', {username,password,firstName,lastName,email,role})
//     return await response.data;
// }