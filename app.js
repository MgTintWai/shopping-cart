var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var Handlebars = require('handlebars')
var { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
var { engine } = require('express-handlebars');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var indexRouter = require('./routes/index');
// var validator = require('express-validator');

var app = express();

mongoose.connect('mongodb+srv://admin:admin123@cluster0.rq7vb.mongodb.net/shop', {
    useUnifiedTopology: true,
    autoIndex: true, //make this also true
});
// view engine setup
require('./config/passport');

app.engine('.hbs', engine({ defaultLayout: 'layout', extname: '.hbs', handlebars: allowInsecurePrototypeAccess(Handlebars) }));
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(validator());

app.use(cookieParser());

app.use(session({ secret: 'mysupersecret', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function() {
    console.log("Connected successfully");
});

app.listen(3000);

module.exports = app;