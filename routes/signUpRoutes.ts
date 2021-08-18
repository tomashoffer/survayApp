export { };
const express = require('express');
const router = express.Router();
import { body } from 'express-validator';
import {registerUser} from '../controllers/signUpControllers'

router.post('/registerUser',
    body('email','Ingrese email')
    .exists()
    .isEmail(),
    body('password', 'La contrasena debe tener un minimo de 4 caracteres')
    .exists()
    .isLength({min:4}) 
, registerUser)
 



module.exports = router;