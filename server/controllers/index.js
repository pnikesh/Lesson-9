let express = require("express");
let mongoose = require("mongoose");
let passport = require("passport");

//references to define user model
let UserModel = require("../models/user");
let User = UserModel.User; //alias for UserModel

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

/*module.exports,displayFavouritePage =  (req, res, next) => {
    res.render('index', { title: 'Favourites' });
}*/

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

module.exports.processLoginPage = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    // server error?
    if (err) {
      return next(err);
    }
    // is there a user login error?
    if (!user) {
      req.flash("loginMessage", "Authentication Error");
      return res.redirect("/login");
    }
    req.logIn(user, err => {
      // server error?
      if (err) {
        return next(err);
      }
      return res.redirect("/contact-list");
    });
  })(req, res, next);
};

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
        req.flash("registerMessage", "User already exist");
      }
      return res.render("auth/register", {
        title: "Register",
        messages: req.flash("registerMessage"),
        dispalyName: req.user ? req.user.dispalyName : ""
      });
    } else {
      // if no error exists, then registration is successful

      // redirect the user
      return passport.authenticate("local")(req, res, () => {
        res.redirect("/contact-list");
      });
    }
  });
  //if registration is successfull
  return passport.authenticate(
    "local",
    (req,
    res,
    () => {
      res.redirect("/");
    })
  );
};

module.exports.performLogout = (req, res, next) => {
  req.logout();
  res.redirect("/"); //back to home page
};
