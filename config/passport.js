var passport = require('passport');
var User = require('../models/user');
var localStrategy = require('passport-local').Strategy;
const { check, validationResult } = require('express-validator');
// Allow passport to store user in session
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// To retrieve user from session
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    })
})

// Use when create new user
// Localstrategy have two arguments.First one is JS Object and Second one is Callback Function
passport.use('local.signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done) {
    // req.checkBody({ 'email': 'Invalid Email' }).notEmpty().isEmail();
    // req.checkBody({ 'password': 'Invalid Password' }).notEmpty().isLength({ min: 4 });

    // var errors = req.validationErrors();

    // if (errors) {
    //     var messages = [];
    //     errors.forEach(function(error) {
    //         messages.push(error.msg);
    //     })
    //     return done(null, false, req.flash('error', messages));
    // }
    [
        check('email')
        .not()
        .isEmpty()
        .isEmail()
        .withMessage('Email is required'),
        check('password', 'Password is requried')
        .isLength({ min: 1 })
    ], (req, res) => {
        var errors = validationResult(req).array();
        if (errors) {
            req.session.errors = errors;
            req.session.success = false;
            res.redirect('/user/signup');
        } else {
            req.session.success = true;
            res.redirect('/user/signup');
        }
    }

    User.findOne({ 'email': req.body.email }, function(err, user) {
        if (err) {
            return done(err);
        }
        if (user) {
            return done(null, false, { message: 'Email is already in use' });
        }
        var newUser = new User();

        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);

        newUser.save(function(err, result) {
            if (err) {
                return done(err);
            }
            return done(null, newUser);
        })

    })
}));