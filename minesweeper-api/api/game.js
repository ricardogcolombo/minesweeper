let router = require("express").Router();
const controller = require("./gameController");

router.route("/createGame").post(controller.createGame);
router.route("/game").get(controller.getGame).post(controller.saveGame);

module.exports = router;
