export {};
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const fs = require("fs");

import { validationResult } from "express-validator";
app.use(cookieParser());

// LEER JSON Users
const localJson = () => {
  const fileJson = fs.readFileSync("./db/users.json");
  return JSON.parse(fileJson);
};

export function logInUser(req: any, res: any) {
    const { email, password } = req.body;
    const users = localJson();

    const errors = validationResult(req);
     if (!errors.isEmpty()) {

    console.log(errors);
    return res.status(400).json({ errors: errors.array() });
  } 
  try {
    const correctUser = users.some(
      (elements: any) =>
        elements.email === email && elements.password === password
    );
    if (correctUser) {
      const doLogin = users.find(
        (elements: any) =>
          elements.email === email && elements.password === password
      );
      res.cookie("cookieName", JSON.stringify(doLogin), {
        maxAge: 3000000,
        httpOnly: true,
      });
      res.send({ userInfo: doLogin });
    } else{
      throw new Error('User no Found')
    }
  } catch (error) {
    res.status(500).send({ error: `${error}` });
  }
}

export function logOutUser(req: any, res: any) {
     res.clearCookie('cookieName');
     res.send({clear:true});
}