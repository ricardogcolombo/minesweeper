let router = require("express").Router();
const controller = require("./gameController");
const authJwt = require("../jwtMiddleware")
/**
 * @swagger
 * /createGame:
 *   post:
 *     description: create a game
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: size 
 *         description: size or number of columns of the board
 *         in: formData
 *         required: true
 *         type: string
 *       - name: mines
 *         description: quantity of mines
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: game info, size, mines, board definition
 */
router.route("/createGame").post(controller.createGame);

/**
 * @swagger
 * /game:
 *   post:
 *     description: get game data
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: gameid
 *         description: game Id to get data
 *     responses:
 *       200:
 *         description: data of the game
 */
router.route("/game/:id").get(verifyToken,controller.getGame);

/**
 * @swagger
 * /game:
 *   get:
 *     description: get list of games 
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: list of games
 */
router.route("/game").get(verifyToken,controller.getAllGames)

/**
 * @swagger
 * /game:
 *   post:
 *     description: save game data
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: size 
 *         description: size or number of columns of the board
 *         in: formData
 *         required: true
 *         type: string
 *       - name: mines
 *         description: quantity of mines
 *         in: formData
 *         required: true
 *         type: string
 *       - name: board
 *         description: 
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: list of games
 */
router.route("/game").post(verifyToken,controller.saveGame);

module.exports = router;
