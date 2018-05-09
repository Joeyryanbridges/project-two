var path = require("path");
var db = require("../models");
var passport = require('passport');
var authController = require('../controllers/authcontroller.js');

module.exports = function (app) {

    app.get('/auth', authController.signup);

    app.get('/profile', isLoggedIn, authController.dashboard);

    app.get('/wall', isLoggedIn, authController.wall);

    app.get('/logout', authController.logout);

    app.get("*", isLoggedIn, authController.dashboard);

    //app.get('/signup', authController.authorization);

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',

        failureRedirect: '/auth'
    })
    )

    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/profile',

        failureRedirect: '/auth'
    }

    ));

    function isLoggedIn(req, res, next) {

        if (req.isAuthenticated())

            return next();

        res.redirect('/auth');

    }
    app.get('/api/user_data', function (req, res) {

        if (req.user === undefined) {
            // The user is not logged in
            res.json({});
        } else {
            res.json({
                userId: req.user.id
            });
        }
    });
}


