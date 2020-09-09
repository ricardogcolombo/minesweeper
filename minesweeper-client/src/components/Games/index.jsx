import React, {useContext, useEffect, useState} from "react";
import {StateContext} from "../../context";

import { List, Avatar } from 'antd';
import {getGames} from "../../hooks";
import {useHistory} from "react-router-dom";
const Games = () => {
    const history = useHistory()
    const {
        state: {userData},
        dispatch,
    } = useContext(StateContext);
    const [data,setData] = useState([])

    useEffect(()=>{
        if(userData)
            getGames().then(games=>{
                if(games.length)
                    setData(games)
            })
    },[userData])
    const loadGame= (id)=>{
        dispatch({type:'SET_GAMEINFO',payload:{gameinfo:{
            gameId:id,
        },userData}})
        history.push("/Game");
    }

    return (
        <div>
            {userData&& (
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item onClick={()=>loadGame(item.gameId)} >
                            <List.Item.Meta 
                                avatar={<Avatar src="https://cdn.iconscout.com/icon/premium/png-64-thumb/minesweeper-game-1181583.png" />}
                                title={item.gameid}
                                description={`Game size ${item.size}x ${item.size} - time: ${item.time}`}
                            />
                        </List.Item>
                    )}
                />
            )}
        </div>
    );
};
export default Games;
