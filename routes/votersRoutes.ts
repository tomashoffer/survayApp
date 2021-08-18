export{};
import { addvoter } from "../controllers/votersControllers";
const express = require('express');
const router =express.Router();
router.post('/addVoter', addvoter);
module.exports= router;

