let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');


//creates a reference to the contact model
let contact = require('../models/favourite');

/* GET contacts list - READ */
router.get('/',(req,res,next) => {
    contact.find((err,favouriteThingsList) => {
        //console.log(contactList);
        if(err){
            return console.error(err);
        }
        else{
            console.log(favouriteThingsList);
            res.render('favourites/index',{
                title: 'Favourite Things',
                favouriteThingsList: favouriteThingsList
            });
        }
    })
});

module.exports = router;