// TODO MOVE TO .ENV
const BASE_URL = "http://localhost:5000/api/v1";
export const getGame = async ({gameinfo, userid}) => {
    let response;
    if (gameinfo.gameId) {
        response = await fetch(`${BASE_URL}/game/${gameinfo.gameId}?userid=${userid}`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            }
        });
    } else {
        response = await fetch(`${BASE_URL}/createGame`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                mines: gameinfo.mines,
                size: gameinfo.size,
            }),
        });
    }
    const json = await response.json();
    if (response.status === 500) {
        console.log("Error Arreglar!");
        return {
            size: 8,
            mines: 8,
        };
    }
    const mines = getMines(json.board);
    return {
        gameId: json.gameid,
        size: json.size,
        mines: mines,
        board: json.board,
    };
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
export const saveGame = async ({gameinfo, userid}) => {
    const mines = getMines(gameinfo.board);
    let response = await fetch(`${BASE_URL}/game`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userid: userid,
            size: gameinfo.size,
            mines: mines,
            board: gameinfo.board,
            time: gameinfo.time,
        }),
    });

    return response.status;
};
