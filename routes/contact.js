let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

//creates a reference to the contact model
let contactModel = require("../models/contact");

/* GET contacts list - READ */
router.get("/", (req, res, next) => {
  contactModel.find((err, contactList) => {
    //console.log(contactList);
    if (err) {
      return console.error(err);
    } else {
      console.log(contactList);
      res.render("contacts/index", {
        title: "Contact List",
        contactList: contactList
      });
    }
  });
});

/*get route for add page
it ill display add page*/
router.get("/add", (req, res, nest) => {
  res.render("contacts/add", {
    title: "Add New Contact"
  });
});

/*POST route for processing the add page*/
router.post("/add", (req, res, next) => {
  let newContact = contactModel({
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    age: req.body.age
  });

  contactModel.create(newContact, (err, contactModel) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh contact list
      res.redirect("/contact-list");
    }
  });
});

/*GET REquest ro display edit page*/

router.get("/edit/:id", (req, res, next) => {
  let id = req.params.id;
  contactModel.findById(id, (err, contactObject) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //show thw edit view
      res.render("contacts/edit", {
        title: "Edit Contact",
        contact: contactObject
      });
    }
  });
});

/**POST request - UPDATE DB with data from edit page*/
router.post("/edit/:id", (req, res, nest) => {
  let id = req.params.id;

  let updatedContact = contactModel({
    "_id": id,
    "first_name": req.body.firstName,
    "last_name": req.body.lastName,
    "age": req.body.age
  });

  contactModel.update({ _id: id }, updatedContact, err => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refres contact list
      res.redirect("/contact-list");
    }
  });
});

/*GET rewuest to perform DELETE operation */
router.get('/delete/:id',(req,res,next) => {
    let id = req.params.id;

    contactModel.remove({_id: id}, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
          } else {
            //refres contact list
            res.redirect("/contact-list");
          }
    })
});

module.exports = router;
