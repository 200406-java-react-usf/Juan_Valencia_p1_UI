import {revaboardsClient} from './revaboards-client';

revaboardsClient.defaults.withCredentials = true;

export async function authenticate(username: string, password: string){
    let response = await revaboardsClient.post('http://p1reimbursement-env.eba-2gpgjpzh.us-east-1.elasticbeanstalk.com/auth', {username, password});
    return await response.data;
}

export async function addNewEmployee(username: string, password: string, firstName: string, lastName: string, email: string, role: string){
    let response = await revaboardsClient.post('http://p1reimbursement-env.eba-2gpgjpzh.us-east-1.elasticbeanstalk.com/employees', {username,password,firstName,lastName,email,role})
    return await response.data;
}