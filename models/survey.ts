

export class Survey {  
    id: string;
    title: string;
    admin: string;
    question: Array<any>; 
    constructor(id: string, title: string, admin: string, question: Array<any>) {
        this.id = id;
        this.title = title;
        this.admin = admin;
        this.question = question;
        
    }
}


