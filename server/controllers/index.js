let express = require("express");
let mongoose = require("mongoose");
let passport = require("passport");

let jwt = require('jsonwebtoken');
let DB = require('../config/db');

//references to define user model
let UserModel = require("../models/user");
let User = UserModel.User; //alias for UserModel

/*
module.exports.displayHomePage = (req, res, next) => {
  res.render("index", { title: "Home" });
};

module.exports.displayAboutPage = (req, res, next) => {
  res.render("index", { title: "About" });
};

module.exports.displayContactPage = (req, res, next) => {
  res.render("index", { title: "Contact" });
};

module.exports.displayProductPage = (req, res, next) => {
  res.render("index", { title: "Products" });
};

module.exports.displayServicePage = (req, res, next) => {
  res.render("index", { title: "Services" });
};



module.exports.displayLoginPage = (req, res, next) => {
  // check if user is already logged in
  if (!req.user) {
    res.render("auth/login", {
      title: "Login",
      messages: req.flash("loginMessage"),
      displayName: req.user ? req.user.displayName : ""
    });
  } else {
    return res.redirect("/");
  }
};
*/

module.exports.processLoginPage = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    // server error?
    if (err) {
      return next(err);
    }
    // is there a user login error?
    if (!user) {
     // req.flash("loginMessage", "Authentication Error");
     return res.json({success: false, msg: 'ERROR: Failed to Log In User!'});
    }
    req.logIn(user, err => {
      // server error?
      if (err) {
        return next(err);
      }

      const payload = {
        id: user._id,
        displayName: user.displayName,
        username: user.username,
        email: user.email
      }

      const authToken = jwt.sign(payload, DB.secret, {
        expiresIn: 604800 // 1 Week
      });

      return res.json({success: true, msg: 'User Logged in Successfully!', user: {
        id: user._id,
        displayName: user.displayName,
        username: user.username,
        email: user.email
      }, token: authToken});

    });
  })(req, res, next);
};

/*
module.exports.displayRegistrationPage = (req, res, next) => {
  if (!req.user) {
    res.render("auth/register", {
      title: "Regiser",
      messages: req.flash("registerMessage"),
      dispalyName: req.user ? req.user.dispalyName : ""
    });
  } else {
    return res.redirect("/"); // already register
  }
};
*/


module.exports.processRegistrationPage = (req, res, next) => {
  let newUser = new User({
    username: req.body.username,
    //password: req.body.password
    email: req.body.email,
    displayName: req.body.displayName
  });

  User.register(newUser, req.body.password, err => {
    if (err) {
      console.log("Error in inserting new User");
      if (err.name == "UserExistsError") {
        console.log("Error: User Already Exists!");
      }
      return res.json({success: false, msg: 'ERROR: Failed to Register User!'});
      
    } else {
      // if no error exists, then registration is successful

      // redirect the user
      return res.json({success: true, msg: 'User Registered Successfully!'});
    }
  });
};

module.exports.performLogout = (req, res, next) => {
  req.logout();
  res.json({success: true, msg: 'User Successfully Logged out!'}); //back to home page
};
