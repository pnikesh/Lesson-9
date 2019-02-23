let express = require("express");
let router = express.Router();

let indexController = require("../controllers/index");

/* GET home page. */
router.get("/", indexController.displayHomePage);

router.get("/about", indexController.displayAboutPage);

router.get("/contact", indexController.displayContactPage);

router.get("/products", indexController.displayProductPage);

router.get("/services", indexController.displayServicePage);

//router.get('/favourite', indexController.displayFavouritePage);

/* GET log in page*/
router.get("/login", indexController.displayLoginPage);

/*POST req to process login page */
router.post("/login", indexController.processLoginPage);

/*GET - display the registration page */
router.get("/register", indexController.displayRegistrationPage);

/*POST - process registration page */
router.post("/register", indexController.processRegistrationPage);

/*GET -  perform log out req*/
router.get("/logout", indexController.performLogout);

module.exports = router;
