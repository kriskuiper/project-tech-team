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
const renderFeed = require("./app/controllers/renderFeed");
const renderForm = require("./app/controllers/renderForm");
const addPost = require("./app/controllers/addPost");
const renderPostDetail = require("./app/controllers/renderPostDetail");
const serveNotFound = require("./app/controllers/serveNotFound");

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
    .get("/my-feed", renderFeed)
    .get("/add-post", renderForm) 
    .get("/my-feed/:url", renderPostDetail)

    .post("/", createAccount)
    .post("/my-feed", addPost)
    .post("/log-in", login)

    .use(serveNotFound)
    .listen(process.env.PORT || port, listening);

function listening() {
    console.log(`The app is shown at port: ${port}`); // eslint-disable-line
}