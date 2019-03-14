let express = require("express");
let router = express.Router();

let jwt = require('jsonwebtoken');

let contactController = require("../controllers/contact");

function requireAuth(req, res, next) {
  // check if the user is logged in
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  next();
}

/* GET contacts list - READ */
router.get("/", contactController.displayContactList);

/*get route for add page
it will display add page*/
router.get("/add",contactController.displayAddPage);

/*POST route for processing the add page*/
router.post("/add", contactController.processAddPage);

/*GET REquest ro display edit page*/
router.get("/edit/:id", contactController.displayEditPage);

/**POST request - UPDATE DB with data from edit page*/
router.post("/edit/:id",contactController.processEditPage);

/*GET rewuest to perform DELETE operation */
router.get("/delete/:id", contactController.performDelete);

module.exports = router;
