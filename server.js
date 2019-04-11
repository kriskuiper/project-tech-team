// Require dependencies from node_modules needed for the server
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// Require controllers
const serveHome = require("./app/controllers/serveHome");
const renderProfile = require("./app/controllers/renderProfile");
const renderSetPassword = require("./app/controllers/renderSetPassword");
const setPassword = require("./app/controllers/setPassword");
const renderCreateAccount = require("./app/controllers/renderCreateAccount");
const createAccount = require("./app/controllers/createAccount");
const login = require("./app/controllers/login");
const logout = require("./app/controllers/logout");
const renderLogin = require("./app/controllers/renderLogin");
const untappdAuth = require("./app/controllers/untappdAuth");
const addBeer = require("./app/controllers/addBeer");
const renderMatches = require("./app/controllers/renderMatches");
const renderUsers = require("./app/controllers/renderUsers");
const renderBars = require("./app/controllers/renderBars");
const renderAddBeer = require("./app/controllers/renderAddBeer");
const searchBeerHome = require("./app/controllers/searchBeerHome");
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
    .use("/", express.static("app/static"))
    .use(bodyParser.urlencoded({extended: true}))
    .use(cookieParser())
    .use(session(sess))
    .set("view engine", "ejs")
    .set("views", "app/view")

    .get("/", serveHome)
    .get("/my-profile", renderProfile)
    .get("/create-account", renderCreateAccount)
    .get("/set-password", renderSetPassword)
    .get("/log-in", renderLogin)
    .get("/log-out", logout)
    .get("/untappd-authentication", untappdAuth)
    .get("/add-beer", renderAddBeer)
    .get("/users", renderUsers)
    .get("/matches", renderMatches)
    .get("/bars", renderBars)

    .post("/search-beer", searchBeerHome)
    .post("/", createAccount)
    .post("/log-in", login)
    .post("/set-password", setPassword)
    .post("/add-beer", addBeer)

    .use(serveNotFound)
    .listen(process.env.PORT || port, listening);

function listening() {
    console.log(`App is on port ${port}`);
}
