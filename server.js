// Require dependencies from node_modules needed for the server
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

// Require controllers
const serveHome = require("./app/controllers/serveHome");
const renderCreateAccount = require("./app/controllers/renderCreateAccount");
const createAccount = require("./app/controllers/createAccount");
const login = require("./app/controllers/login");
const logout = require("./app/controllers/logout");
const renderLogin = require("./app/controllers/renderLogin");
const serveNotFound = require("./app/controllers/serveNotFound");
const users = require("./app/controllers/totalUsers");
const match = require("./app/controllers/match");

// Process environment vars and connect to database
const uri = process.env.MONGODB_URI;
mongoose.set("useNewUrlParser", true);
mongoose.connect(uri);

// Process secret and define sess for using express-session
const secret = process.env.SESSION_SECRET;
const sess = {
    resave: false,
    saveUninitialized: true,
    secret: secret,
};

const app = express();
const port = 8000;

app
    .use("/static", express.static("app/static"))
    .use(bodyParser.urlencoded({extended: true}))
    .use(session(sess))
    .set("view engine", "ejs")
    .set("views", "app/view")
    
    .get("/", serveHome)
    .get("/create-account", renderCreateAccount)
    .get("/log-in", renderLogin)
    .get("/log-out", logout)
    .get("/matches", match)
    .get("/users", users)

    .post("/", createAccount)
    .post("/log-in", login)

    .use(serveNotFound)
    .listen(process.env.PORT || port, listening);

function listening() {
    console.log(`App is on port ${port}`); // eslint-disable-line
}