const {user, usergames, games} = require("../models/");
const createGame = (req, res, next) => {
    let {size, mines} = req.body;
    console.log(req.body);
    let newCells = new Array(size * size).fill().map((item, index) =>
        Object.assign(
            {},
            {
                userid: 1,
                gameid: 1,
                cellId: index,
                flag: false,
                mine: false,
                visible: false,
            },
        ),
    );
    newCells = plantMines(newCells, size, mines);
    res.send({size, mines, board: newCells});
};

const getUsername = (userId) => {
    return user.findOne({where: {id: userId}});
};
const getAllGames = async (req, res, next) => {
    const {userId} = req;
    getUsername(userId).then((resp) => {
        const {
            dataValues: {username},
        } = resp;
        if (!username) {
            res.status(403);
        }
        return usergames
            .findAll({where: {username: username}})
            .then((resp) => {
                res.send(resp);
            })
            .catch((err) => {
                next(err);
            });
    });
};

const getGame = async (req, res, next) => {
    const {userId} = req;
    const {id} = req.params;
    let user;
    let gameInfo = {};
    getUsername(userId)
        .then((resp) => {
            const {
                dataValues: {username},
            } = resp;
            user = username;
            if (!username) {
                res.status(403);
            }
            return usergames.findOne({where: {username: username, gameId: parseInt(id)}});
        })
        .then((resp) => {
            if (resp.dataValues) {
                gameInfo = {
                    size: resp.dataValues.size,
                    time: resp.dataValues.time,
                };
            }
            return games.findAll({where: {username: user, gameId: parseInt(id)}});
        })
        .then((resp) => {
            if (resp) {
                let board = resp.map((item) => {
                    const {gameId, username, flag, mine, visible, value, cellId} = item.dataValues;
                    return {gameId, username, flag, mine, visible, value, cellId};
                });
                gameInfo = {
                    ...gameInfo,
                    minas: getMines(board),
                    board: board,
                };
                res.send(gameInfo)
            }
            res.status(404);
        })
        .catch((err) => {
            next(err);
        });
};

const saveGame = (req, res, next) => {
    const {size, mines, time, board} = req.body;
    const {userId} = req;
    let gameId;
    let user;
    getUsername(userId)
        .then((resp) => {
            const {
                dataValues: {username},
            } = resp;
            if (!username) {
                res.status(403);
            }
            user = username;
            return usergames.max("gameId", {where: {username: username}});
        })
        .then((data) => {
            gameId = data + 1 || 1;
            return usergames.create({
                gameId,
                username: user,
                size,
                time,
            });
        })
        .then((resp) => {
            let values = board.map(({flag, mine, visible, cellId, value}) => {
                let definedValue = value === undefined ? null : value;
                return {
                    username: user,
                    gameId,
                    cellId,
                    flag,
                    mine,
                    visible,
                    value: definedValue,
                };
            });
            return games.bulkCreate(values, {ignoreDuplicateS: true});
        })
        .then((resp) => {
            res.send({username: user, gameId});
        })
        .catch((err) => {
            console.log(err);
            next(err);
        });
};

const plantMines = (cells, size, mines) => {
    let minesPlanted = 0;
    let bombsites = [];
    while (minesPlanted < mines) {
        let random = Math.floor(Math.random() * Math.floor(size * size));
        if (!cells[random].mine) {
            bombsites.push(random);
            cells[random].mine = true;
            minesPlanted++;
        }
    }
    cells = cells.map((item, index) => (!item.mine ? {...item, value: getNearBombs(cells, size, index)} : item));
    return cells;
};

const getNearBombs = (cells, size, key) => {
    let value = 0;
    let rowA = key - size;
    let rowB = key + size;
    let totalCells = cells.length;
    // A  B(rowA) C
    // D  X       F
    // G  H(rowB) I
    // X represents value

    const countBombs = (cell, value) => (cell.mine ? value + 1 : value);
    // if cell B does not exists X is first row
    if (rowA > 0) {
        value = countBombs(cells[rowA], value);
    }
    // cell A exists? key%size===0 when is the first column
    if (rowA - 1 > 0 && key % size !== 0) {
        value = countBombs(cells[rowA - 1], value);
    }

    // if rowA+1 % size ===0 => is the last column
    if (rowA + 1 > 0 && (rowA + 1) % size !== 0) {
        value = countBombs(cells[rowA + 1], value);
    }

    // H > total cells then is the last row
    if (rowB < totalCells) {
        value = countBombs(cells[rowB], value);
    }

    // I case
    if (rowB + 1 < totalCells && (key + 1) % size !== 0) {
        value = countBombs(cells[rowB + 1], value);
    }

    // G Case
    if (rowB - 1 < totalCells && key % size !== 0) {
        value = countBombs(cells[rowB - 1], value);
    }

    if (key < totalCells && (key + 1) % size !== 0) {
        value = countBombs(cells[key + 1], value);
    }

    if (key > 0 && key % size !== 0) {
        value = countBombs(cells[key - 1], value);
    }

    return value;
};
const getMines = (board) => {
    return board.reduce((acum, item) => {
        if (item.mine) {
            return acum + 1;
        } else {
            return acum;
        }
    }, 0);
};
module.exports = {getAllGames, saveGame, createGame, getGame};
