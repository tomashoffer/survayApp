export {};
import { User } from "../models/users";
import { validationResult } from "express-validator";
const fs = require("fs");
// LEER JSON Users
const localJson = () => {
  const fileJson = fs.readFileSync("./db/users.json");
  return JSON.parse(fileJson);
};

export function registerUser(req: any, res: any) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(req.body);
    // const valores = req.body;
    // const validaciones = errors.array();
    // res.render("register", { validaciones: validaciones, valores: valores });
    console.log(errors);
    return res.status(400).json({ errors: errors.array() });
    // 
    
    
  } else {
    res.send("pepe");
  }
  const { name, email, password, array } = req.body;
  const users = localJson();
  const user = new User(name, email, password, []);
  users.push(user);
  fs.writeFileSync("./db/users.json", JSON.stringify(users));

  res.send(users);
}