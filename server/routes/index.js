let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index');

/* GET home page. */
router.get('/', indexController.displayHomePage);

router.get('/about', indexController.displayAboutPage);

router.get('/contact', indexController.displayContactPage);

router.get('/products', indexController.displayProductPage);

router.get('/services', indexController.displayServicePage);

//router.get('/favourite', indexController.displayFavouritePage);

module.exports = router;
