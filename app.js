//import modules
var express = require('express');
var fs = require('fs');
var bodyParser = require("body-parser");
var session = require("express-session");
var mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

//connection setting
var app = express();
var PORT = process.env.PORT || 8080;
mongoose.connect('mongodb://localhost/test');
const db = mongoose.connection;

db.on('error', function (err) {
    console.error("connection error;", error);
});
db.once("open", () => {
    console.log("DB connected");
})
var server = app.listen(PORT, () => {
    console.log("Running 8080");
});

//use settings
app.set("views", __dirname + "/views");
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({
    secret: "asj;lkjdk;fl;ghaksdldf",
    resave: false,
    saveUninitialized: true,
})
);

var Tip = require('./models/tip');
var router = require("./routes/main")(app, Tip, fs);