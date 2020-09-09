let router = require("express").Router();
let {checkDuplicateUsernameOrEmail} = require('../middleware')
let controller = require('./authController')

// ROUTES
/**
 * @swagger
 * /signup:
 *   post:
 *     description: Register user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: Username to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: email 
 *         description: email address
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password 
 *         description: password
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: signup
 */
router.route("/signup").post(checkDuplicateUsernameOrEmail,controller.signup)

/**
 * @swagger
 * /signin:
 *   post:
 *     description: Login to the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: Username to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password 
 *         description: password
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: signin
 */
router.route("/signin").post(controller.signin);

module.exports = router;
