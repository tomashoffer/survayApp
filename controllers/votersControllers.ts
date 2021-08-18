import { Voter } from "../models/voter";
const { v4: uuidv4 } = require('uuid');

export {};
const fs = require("fs");
const userJson = () => {
  const fileJson = fs.readFileSync("./db/voters.json");
  return JSON.parse(fileJson);
};

export const addvoter = (req: any, res: any) => {
  const { name, email } = req.body;
  let id = uuidv4();
  const voters = userJson();
  const voter = new Voter(id,name, email);
  voters.push(voter);
  fs.writeFileSync("./db/voters.json", JSON.stringify(voters));
  res.send(voters);
};
