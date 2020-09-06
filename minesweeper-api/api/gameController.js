const pool = require("../db/index");

const createGame = (req, res, next) => {
    let {size, mines} = req.body;
    console.log(req);

    let newCells = new Array(size * size).fill().map((item, index) =>
        Object.assign(
            {},
            {
                userid: 1,
                gameid: 1,
                id: index,
                flag: false,
                mine: false,
                visible: false,
            },
        ),
    );
    newCells = plantMines(newCells, size, mines);

    res.send({size, mines, board: newCells});
};
const getGame = async (req, res, next) => {
    const {id} = req.params;
    try {
        pool.getConnection()
            .then((conn) => {
                const query = `select t.userid,t.gameid,t.size,t.time,g.id,g.flag,g.mine,g.visible,g.value from test.usergames t inner join test.games g on g.userid = t.userid and t.gameid = g.gameid where t.userid=${id}`;
                console.log(query);
                conn.query(query)
                    .then((rows) => {
                        console.log(rows); //[ {val: 1}, meta: ... ]
                        const game = {};
                        if (rows.length > 0) {
                            game.size = rows[0].size;
                            game.time = rows[0].time;
                            game.userid = rows[0].userid;
                            game.board = rows.map((item) => {
                                const {size, time, userid, gameid, ...others} = item;

                                return others;
                            });
                        }
                        res.send(game);
                    })
                    .catch((err) => {
                        //handle error
                        console.log(err);
                        conn.end();
                    });
            })
            .catch((err) => {
                //not connected
            });
    } catch (e) {
        res.status(404);
    }
};

const saveGame = (req, res, next) => {
    const {size, mines, time, userid, board} = req.body;
    let conn;
    pool.getConnection()
        .then((connection) => {
            conn = connection;
            return conn.query(`SELECT MAX(gameid) as gameid from usergames where userid=${userid}`);
        })
        .then(([{gameid}]) => {
            let newGameId = gameid || 1;
            try {
                let sql = "INSERT INTO games(userid, gameid,id,flag,mine,visible, value) VALUES (?,?,?,?,?,?,?)";
                let values = board.map(({id, flag, mine, visible, value}) => [
                    userid,
                    newGameId,
                    id,
                    flag,
                    mine,
                    visible,
                    value === undefined ? null : value,
                ]);
                conn.beginTransaction();
                conn.query("INSERT INTO usergames VALUE (?,?,?,?)", [userid, newGameId, size, time]);
                conn.batch(sql, values);

                conn.commit();
                res.send("success");
            } catch (err) {
                conn.rollback();
                console.log(err);
                res.status(500);
            } //handle
        })
        .catch((err) => {
            console.log(err);
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
module.exports = {saveGame, createGame, getGame};
