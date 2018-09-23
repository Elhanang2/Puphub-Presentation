var db = require('../models');
var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models').User;


router.get('/', (req, res) => {
    res.render('index', { user : req.user });
});

router.get('/register', (req, res) => {
    res.render('register', { });
});

router.post('/register', (req, res, next) => {
    console.log('hi from post to register');
    console.log(req.body);
    db.User.create({
        username: req.body.user_name,
        password: req.body.user_password
    }).then(function() {
        passport.authenticate('local')(req, res, () => {
            req.session.save((err) => {
                if (err) {
                    return next(err);
                }
                res.redirect('/');
            });
        });
    }).catch(function(err) {
        return res.render('register', { error : err.message });
    });
});


router.get('/login', (req, res) => {
    res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res, next) => {
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

router.get('/logout', (req, res, next) => {
    req.logout();
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

router.get('/ping', (req, res) => {
    res.status(200).send("pong!");
});

module.exports = router;



// module.exports = function(app, passport) {
// console.log("I am included");
// 
//     app.get('/hey-you', (req, res) => {
//         res.send('stuff');
//     });
// 
//     app.get('/signup', (req, res) => {
//         console.log("sdfkjsldfkjsdfkj");
//         db.user.render(req.body).then(newSignUp => {
//         res.render('signup');
//         });
//     });
// 
//     app.post('/signup', (req, res) => {
//         // posted body = req.body
//         db.User.create(req.body).then(createdUser => {
//             res.redirect('/login');
//             // res.json(createdUser.get({plain: true}))
//         });
//     });
//  
//     app.get('/signin', (req, res) => {
//         console.log("yoyoyoyyoyoy");
//         res.render('signin');
//     });
// 
//     app.post('/login', 
//         passport.authenticate(
//             'local', 
//             { failureRedirect: '/login' }),
//             function(req, res) {
//                 res.redirect('/');
//             
//             });
//         };