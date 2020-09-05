const pool = require("../db/index");

const createGame = (req, res, next) => {
    let {size, mines} = req.body;
    console.log(req);

    let newCells = new Array(size * size).fill().map((item, index) =>
        Object.assign(
            {},
            {
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
const getGame = (req, res, next) => {
    pool.query("SELECT NOW()", (err, data) => {
        console.log(data);
        console.log(err);
        res.send(data);
        pool.end();
    });
};

const saveGame = (req, res, next) => {
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
