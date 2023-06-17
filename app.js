require("dotenv").config(); // allows app read code in .env
const cors = require("cors"); // allows use method in cors
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
const { error } = require("console");
//var usersRouter = require('./routes/users'); (remove)

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());// ????????????????

app.use('/', indexRouter);
// app.use('/users', usersRouter); (remove)
app.use((req,res,next)=>{
    const error = new Error("Path not founds")
    error.statusCode = 404;
    next(error);
})

app.use((err,req,res,next)=>{
    res.status(err.statusCode).send(error.message)
})
module.exports = app;
