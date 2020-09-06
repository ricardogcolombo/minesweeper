

const getNeightbours = (cells, key, size) => {
    let neightbours = [];
    let rowA = key - size;
    let rowB = key + size;
    let totalCells = cells.length;
    // A  B(rowA) C
    // D  X       F
    // G  H(rowB) I
    // X represents value

    // if cell B does not exists X is first row
    if (rowA >= 0) neightbours.push(rowA);

    // cell A exists? key%size===0 when is the first column
    if (rowA - 1 >= 0 && key % size !== 0) neightbours.push(rowA - 1);

    // if rowA+1 % size ===0 => is the last column
    if (rowA + 1 > 0 && (rowA + 1) % size !== 0) neightbours.push(rowA + 1);

    // H > total cells then is the last row
    if (rowB < totalCells) neightbours.push(rowB);

    // I case
    if (rowB + 1 < totalCells && (key + 1) % size !== 0) neightbours.push(rowB + 1); // G Case

    if (rowB - 1 < totalCells && key % size !== 0) neightbours.push(rowB - 1);

    if (key < totalCells && (key + 1) % size !== 0) neightbours.push(key + 1);

    if (key > 0 && key % size !== 0) neightbours.push(key - 1);

    return neightbours;
};
export const clearNeightbours = (cells, key, size) => {
    let present = [];
    let newCells = [...cells]

    getAllNeightbours(newCells, key, size, present);

    if (present.length > 0)
        present.forEach((item) => {
            let t = getNeightbours(newCells, item, size).filter((item) => {
                return newCells[item].value !== 0;
            });

            t.forEach((item) => {
                newCells[item].visible = true;
            });
        });
    return newCells;
};

const getAllNeightbours = (cells, key, size, present) => {
    cells[key] = {...cells[key], flag: false, visible: true};
    let neightbours = [];

    if (present.indexOf(key) === -1 && cells[key].value === 0) {
        present.push(key);

        neightbours = getNeightbours(cells, key, size)
            .filter((item) => {
                return cells[item].value === 0 && present.indexOf(item) === -1;
            })
            .map((item) => {
                return getAllNeightbours(cells, item, size, present);
            });
    }
    return neightbours;
};


