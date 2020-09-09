let router = require("express").Router();
let {checkDuplicateUsernameOrEmail} = require('../middleware')
let controller = require('./authController')

router.route("/signup").post(checkDuplicateUsernameOrEmail,controller.signup)
router.route("/signin").post(controller.signin);

module.exports = router;
