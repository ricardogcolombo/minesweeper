import React, {useContext, useState, useEffect} from "react";
import {BoardContainerStyled, BoardStyled} from "./styled";
import Cell from "../Cell";
import {getGame, saveGame} from "../../hooks";
import {StateContext} from "../../context/index";
import {clearNeightbours} from "./utils";
import {useHistory} from "react-router-dom";
import {Button, Modal} from "antd";

const Board = () => {
    const history = useHistory();
    const {
        state: {tokenId, gameinfo},
    } = useContext(StateContext);
    const [cells, setCells] = useState([]);
    const [mines, setMines] = useState(0);
    const [totalMines, setTotalMines] = useState(1);
    const [size, setSize] = useState(1);
    useEffect(() => {
        if (!tokenId) {
            history.push("/");
        }
        getGame({gameinfo, tokenId}).then((data) => {
            setTotalMines(data.mines);
            setCells(data.board);
            setSize(data.size);
        });
    }, []);

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
    const onSaveGame = () => {
        saveGame({tokenId, gameinfo: {...gameinfo, board: cells}}).then(() => {
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
            <BoardStyled size={8}>
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
            <Button type="primary" onClick={onSaveGame} block>
                SAVE GAME
            </Button>
        </BoardContainerStyled>
    );
};

export default Board;
