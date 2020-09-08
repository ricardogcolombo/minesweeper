// TODO MOVE TO .ENV
const BASE_URL = process.env.REACT_APP_BE_HOST;

export const getGames = async (tokenId) => {
    const response = await fetch(`${BASE_URL}/game`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: getHeaders(tokenId),
    });
    return await response.json();
};
const getHeaders = (tokenId) => {
    return {
        "Content-Type": "application/json",
        tokenId: tokenId,
    };
};
export const getGame = async ({gameinfo, tokenId}) => {
    let response;
    if (gameinfo.gameId) {
        response = await fetch(`${BASE_URL}/game/${gameinfo.gameId}`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: getHeaders(tokenId),
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
export const saveGame = async ({gameinfo, tokenId}) => {
    const mines = getMines(gameinfo.board);
    let response = await fetch(`${BASE_URL}/game`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: getHeaders(tokenId),
        body: JSON.stringify({
            size: gameinfo.size,
            mines: mines,
            board: gameinfo.board,
            time: gameinfo.time,
        }),
    });

    return response.status;
};
