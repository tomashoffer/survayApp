export { };
const express = require('express');
const router = express.Router();

import { addSurveys, getLogInUser, deleteSurvey, saveSelectedSurvey, getSelectedSurvey, editSelectedSurvey } from '../controllers/surveyControllers'

router.post('/addSurvey', addSurveys)
router.get('/logUser', getLogInUser)
router.post('/deleteSurvey/:id', deleteSurvey)
router.get('/saveSurvey/:id', saveSelectedSurvey)
router.get('/getSurvey', getSelectedSurvey)
router.post('/editSurvey', editSelectedSurvey)



module.exports = router;