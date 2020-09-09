import React, {useContext, useState, useEffect} from "react";
import {TimerStyled,BoardContainerStyled, BoardStyled} from "./styled";
import Cell from "../Cell";
import {getGame, saveGame} from "../../hooks";
import {StateContext} from "../../context/index";
import {clearNeightbours} from "./utils";
import {useHistory} from "react-router-dom";
import {Button, Modal} from "antd";

import "./Board.css";
const Board = () => {
    const history = useHistory();
    const {
        state: {userData, gameinfo},
        dispatch,
    } = useContext(StateContext);
    const [cells, setCells] = useState([]);
    const [mines, setMines] = useState(0);
    const [totalMines, setTotalMines] = useState(1);
    const [size, setSize] = useState(1);
    const [time, setTime] = useState(false);
    const [isActive, setIsActive] = useState(false);
    useEffect(() => {
        if (!userData) {
            history.push("/");
        } else {
            getGame({gameinfo}).then((data) => {
                setTotalMines(data.mines);
                setCells(data.board);
                setSize(data.size);
                setTime(data.time || 0);
                setIsActive(true);
            });
        }
    }, []);

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setTime((time) => time + 1);
            }, 1000);
        } else if (!isActive && time !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, time]);

    useEffect(() => {
        if (mines === totalMines) {
            let newCells = cells.map((item) => {
                return {...item, visible: true};
            });
            setCells(newCells);
            Modal.success({
                content: "Congrats!!! You WIN! :)",
                onOk() {
                    history.push("/");
                },
            });
        }
    }, [mines]);
    const onClickCell = (key) => {
        console.log(key);
        // if the cell is visible do nothing
        if (cells[key].visible) return null;

        // if the cell is a mine you loose
        if (cells[key].mine) {
            let newCells = cells.map((item) => {
                return {...item, visible: true};
            });
            setCells(newCells);
            Modal.error({
                content: "Sorry!! You Loose! :(",
                onOk() {
                    history.push("/");
                },
            });
        }
        let newCells = clearNeightbours(cells, key, size);
        setCells(newCells);
    };
    const onBackGame = () => {
        history.push("/");
    };
    const onSaveGame = () => {
        saveGame({gameinfo: {...gameinfo, time: time, board: cells}}).then(() => {
            history.push("/");
        });
    };
    const onRightClick = (key) => {
        cells[key].flag = !cells[key].flag;
        if (cells[key].mine && cells[key].flag) {
            setMines((prev) => prev + 1);
        } else if (cells[key].mine) {
            setMines((prev) => prev - 1);
        }
        setCells(cells);
    };

    return (
        <BoardContainerStyled>
            <TimerStyled>{time&&<div>{`Time: ${Math.trunc(time / 60)} min:${time % 60} sec`}</div>}</TimerStyled>
            <BoardStyled size={size}>
                {cells.map((data, index) => (
                    <Cell
                        value={data.value}
                        visible={data.visible}
                        onClick={onClickCell}
                        showValue={data.showValue}
                        onContextMenu={onRightClick}
                        id={index}
                        key={`${index}`}
                        flag={data.flag}
                        mine={data.mine}
                    />
                ))}
            </BoardStyled>
            <Button className={"saveButton"} type="primary" onClick={onSaveGame} block>
                SAVE GAME
            </Button>
            <Button type="primary" onClick={onBackGame} block>
                BACK TO HOME
            </Button>
        </BoardContainerStyled>
    );
};

export default Board;
