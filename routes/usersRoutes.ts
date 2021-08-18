export { };
const express = require('express');
const router = express.Router();

import { getUsers } from '../controllers/userControllers';

router.get('/getUsers', getUsers);


module.exports = router