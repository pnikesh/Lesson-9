let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');


//creates a reference to the contact model
let contact = require('../models/contact');

/* GET contacts list - READ */
router.get('/',(req,res,next) => {
    contact.find((err,contactList) => {
        //console.log(contactList);
        if(err){
            return console.error(err);
        }
        else{
            console.log(contactList);
            res.render('contacts/index',{
                title: 'Contact List',
                contactList: contactList
            });
        }
    })
});

module.exports = router;