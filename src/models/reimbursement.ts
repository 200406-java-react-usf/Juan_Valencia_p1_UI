export class Reimbursement {
    reimId: number;
    amount: number;
    submitted: string;
    resolved: string;
    description: string;
    author: string;
    resolver: string;
    status: string;
    reimbType: string;

    constructor(id: number, amnt: number, subm: string, resolved: string, desc: string, author: string, resolver: string, status: string, reimtype: string){
        this.reimId = id;
        this.amount = amnt;
        this.submitted = subm;
        this.resolved = resolved;
        this.description = desc;
        this.author = author;
        this.resolver = resolver;
        this.status = status;
        this.reimbType = reimtype; 
    }
}