const express = require('express');
const router = express.Router();
// const bcrypt = require('bcryptjs');
const passport = require('passport');


// Login Page
router.get('/', (req, res) => res.render('admin_login'));

router.use(function (req, res, next) {
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
  });

// Login
router.post('/', (req, res, next) => {
    if (req.body.email === 'super_admin@gmail.com' && req.body.chooseAdmin === "super_admin") {

        passport.authenticate('local', {
            successRedirect: '/admins/superAdmin',
            failureRedirect: '/admins',
            failureFlash: true
        })(req, res, next);

    } else if (req.body.email === 'establishment_admin@gmail.com' && req.body.chooseAdmin === "establishment_admin") {

        passport.authenticate('local', {
            successRedirect: '/admins/establishmentAdmin',
            failureRedirect: '/admins',
            failureFlash: true
        })(req, res, next);

    } else if (req.body.email === 'department_admin@gmail.com' && req.body.chooseAdmin === "department_admin") {

        passport.authenticate('local', {
            successRedirect: '/admins/hodAdmin',
            failureRedirect: '/admins',
            failureFlash: true
        })(req, res, next);
    } else {
        res.render('admin_login', {
            error: "Username Incorrect"
        })
    }

});

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
   res.redirect('/admins');
   
});

module.exports = router