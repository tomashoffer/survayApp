export {};
import { body } from "express-validator";
const express = require("express");
const router = express.Router();

import { logInUser, logOutUser } from "../controllers/logInControllers";

router.post(
  "/postLogIn",
  body("email", "Ingrese email")
  .exists()
  .isEmail(),
  body("password", "La contrasena debe tener un minimo de 4 caracteres")
    .exists()
    .isLength({ min: 4 }),
  logInUser
);
router.get('/logOut', logOutUser);

module.exports = router;
