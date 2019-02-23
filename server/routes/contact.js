let express = require("express");
let router = express.Router();

let contactController = require("../controllers/contact");

function requireAuth(req, res, next) {
  // check if the user is logged in
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  next();
}

/* GET contacts list - READ */
router.get("/", requireAuth, contactController.displayContactList);

/*get route for add page
it ill display add page*/
router.get("/add",requireAuth, contactController.displayAddPage);

/*POST route for processing the add page*/
router.post("/add",requireAuth, contactController.processAddPage);

/*GET REquest ro display edit page*/
router.get("/edit/:id",requireAuth, contactController.displayEditPage);

/**POST request - UPDATE DB with data from edit page*/
router.post("/edit/:id",requireAuth, contactController.processEditPage);

/*GET rewuest to perform DELETE operation */
router.get("/delete/:id",requireAuth, contactController.performDelete);

module.exports = router;
