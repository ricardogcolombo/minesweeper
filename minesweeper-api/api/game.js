let router = require("express").Router();
const controller = require("./gameController");

router.route("/createGame").post(controller.createGame);
router.route("/game/:id").get(controller.getGame);
router.route("/game").post(controller.saveGame);

module.exports = router;
