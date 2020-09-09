// TODO MOVE TO .ENV
const BASE_URL = process.env.REACT_APP_BE_HOST;

const getHeaders = () => {
    const tokenId = JSON.parse(localStorage.getItem('user')).accessToken
    return {
        "Content-Type": "application/json",
        "x-access-token": tokenId,
    };
};

export const register = async (user,email,password)=>{
    const response = await fetch(`${BASE_URL}/signup`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify({
            username:user,
            email,
            password
        })
    });
        return await response.json();
}
export const login = async (user,password)=>{
    const response = await fetch(`${BASE_URL}/signin`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify({
            username:user,
            password
        })
    });
    return await response.json();
}
export const getGames = async () => {
    const response = await fetch(`${BASE_URL}/game`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: getHeaders()
    });
    return await response.json();
};

export const getGame = async ({gameinfo}) => {
    let response;
    if (gameinfo.gameId) {
        response = await fetch(`${BASE_URL}/game/${gameinfo.gameId}`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: getHeaders(),
        });
    } else {
        response = await fetch(`${BASE_URL}/createGame`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: getHeaders(),
            body: JSON.stringify({
                mines: gameinfo.mines,
                size: gameinfo.size,
            }),
        });
    }
    const json = await response.json();
    const mines = getMines(json.board);
    return {
        time: json.time,
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
export const saveGame = async ({gameinfo, size,time}) => {
    const mines = getMines(gameinfo.board);
    let response = await fetch(`${BASE_URL}/game`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: getHeaders(),
        body: JSON.stringify({
            size: gameinfo.size,
            mines: mines,
            board: gameinfo.board,
            time: gameinfo.time,
        }),
    });
    const json =  await response.json();

    return json
};
