export class Response {
    id: string;
    title:string;
question:Array<string>;  
calification:Array<number>;
constructor(id: string, title:string,question:Array<string>,calification:Array<number>) {
    this.id = id;
    this.title = title;
    this.question = question;
    this.calification =calification;
}
}