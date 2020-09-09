let router = require("express").Router();
const controller = require("./gameController");
const authJwt = require("../jwtMiddleware")

router.route("/createGame").post(controller.createGame);
router.route("/game/:id").get(verifyToken,controller.getGame);
router.route("/game").get(verifyToken,controller.getAllGames).post(verifyToken,controller.saveGame);

module.exports = router;
