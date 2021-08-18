export{};
const express = require("express");
const app = express();
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
const cookieParser = require("cookie-parser");
import {Response} from '../models/response';

app.use(express.json());
app.use(cookieParser());

// READ SURVEY JSON
export const getAllSurveys = () => {
  const fileJson = fs.readFileSync("./db/survey.json");
  return JSON.parse(fileJson);
};
// READ USERS JSON`
export const getAllUsers = () => {
  const fileJson = fs.readFileSync("./db/users.json");
  return JSON.parse(fileJson);
};
// READ RESPONSE JSON`
export const getAllResponse = () => {
  const fileJson = fs.readFileSync("./db/response.json");
  return JSON.parse(fileJson);
};


export const getAllResponds= ()=> {
  const fileJson = fs.readFileSync("./db/response.json");
  return JSON.parse(fileJson);
}


export function getSuveryShare(req: any, res: any) {
  const idQuery  = req.query;
  const getSuvery = getAllSurveys();
  const findSurv = getSuvery.find((user:any) => user.id === idQuery.id);
  res.cookie('shareSurv', findSurv, { maxAge: 300000000, httpOnly: true });
  res.send(findSurv);
}

export function sendRespon(req:any,res:any){

  const {id,arr } = req.body;
  // let id = uuidv4();
  const responds = getAllResponds();

  const survey = getAllSurveys();


  const a = survey.find((user:any)=>user.id === id)

  const aa = [{
    title: a.title,
    question : a.question,
    respondes : arr 
  }]

  responds.push(aa)


  fs.writeFileSync("./db/response.json", JSON.stringify(responds));



  // const respond = new Response(id,arr);
  // responds.push(respond);
  // fs.writeFileSync("./db/response.json", JSON.stringify(responds));

  res.send(responds);

}

export function getResp(req:any,res:any){
  const getRes =  getAllResponse();
  console.log(getRes);
  // const findByTitle 
  res.send(getRes)
}
