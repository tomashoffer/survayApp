const express = require("express");
const app = express();
const fs = require("fs");
const cookieParser = require("cookie-parser");


export const localJson = () => {
    const fileJson = fs.readFileSync("./db/users.json");
    return JSON.parse(fileJson);
  };

app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));
app.set("port", 3500 || process.env.PORT);

// ROUTES FILES IMPORTS
const usersRoute = require('./routes/usersRoutes');
const signUpRoute = require('./routes/signUpRoutes');
const logInRoute = require('./routes/logInRoutes');
const addSurveys = require('./routes/surveyRoutes');
const votersRoute = require('./routes/votersRoutes');
const responseRoute = require('./routes/responseRoutes');


// ROUTES
app.use('/users', usersRoute);
app.use('/signUp', signUpRoute);
app.use('/logIn', logInRoute);
app.use('/survey', addSurveys);
app.use('/voter', votersRoute);
app.use('/response', responseRoute);


app.listen(app.get("port"), () => {
    console.log(`app listening at http://localhost:${app.get("port")}`);
  });