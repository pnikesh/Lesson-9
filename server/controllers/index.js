let express = require('express');
let mongoose = require('mongoose');
let passport = require('passport');

//references to define user model
let UserModel = require('../models/user');
let User = UserModel.User; //alias for UserModel


module.exports.displayHomePage = (req, res, next) => {
    res.render('index', { title: 'Home' });
}

module.exports.displayAboutPage =  (req, res, next) => {
    res.render('index', { title: 'About' });
}

module.exports.displayContactPage =  (req, res, next) => {
    res.render('index', { title: 'Contact' });
}

module.exports.displayProductPage =  (req, res, next) => {
    res.render('index', { title: 'Products' });
}

module.exports.displayServicePage =  (req, res, next) => {
    res.render('index', { title: 'Services' });
}

/*module.exports,displayFavouritePage =  (req, res, next) => {
    res.render('index', { title: 'Favourites' });
}*/

module.exports.displayLoginPage = (req, res, next) => {
    //check if user not already logged in
    if(!req.user){
        //render login page
        res.render('/auth/login', {
            title: "Login",
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
        return;
    }
    else {
        return res.redirect('/'); //redirect to root
    }
}

module.exports.processLoginPage = 
        passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: 'bad login',
        failureMessage: 'bad login'
    });
    


module.exports.displayRegistrationPage = (req, res, next) => {
     if(!req.user){
         res.render('auth/register', {
             title: "Regiser",
             messages: req.flash('registerMessage'),
             dispalyName: req.user ? req.user.dispalyName : ''
         })

     }else{
         return res.redirect('/') // already register
     }
    
}

module.exports.processRrgistrationPage = (req, res, next) => {
    User.register(
        new User({
            userName: req.body.userName,
            password: req.body.password,
            email: req.body.email,
            displayName: req.body.dispalyName
        }),
        req.user.password,
        (err) => {
            if (err) {
                console.log('Error in inserting new User');
                if (err.name == "UserExiststError") {
                    req.flash('registerMessage', 'User already exist');
                }
            }
            return res.render('auth/register', {
                title: 'Register',
                messages: req.flash('registerMessage'),
                dispalyName: req.user ? req.user.dispalyName : ''
            })
        }


    )
    //if registration is successfull
    return passport.authenticate('local', (req, res, () => {
        res.redirect('/');
    }));
}

module.exports.performLogout = (req, res, next) => {
    req.logout();
    req.redirect('/'); //back to home page
}