import React, {useState, useContext, useEffect} from "react";
import {Input, Button, Radio, Row, Col} from "antd";
import {StateContext} from "../../context/index";
import {useHistory} from "react-router-dom";

const CreateGame = () => {
    const {
        state: {userid},
        dispatch
    } = useContext(StateContext);
    const [size, setSize] = useState(8);
    const [mines, setMines] = useState(8);
    const [gameId, setGameId] = useState(0);
    const history = useHistory();
    const onClickStart = () => {
        dispatch({type:'SET_GAMEINFO',payload:{gameinfo:{
            gameId,
            time:0,
            size,
            userid,
            mines,
        }}})
        history.push("/Game");
    };

    const onClickLoad = () => {
        dispatch({type:'SET_GAMEINFO',payload:{gameinfo:{
            gameId,
            userid,
        }}})
        history.push("/Game");
    };

    const sizeOptions = [
        {label: "4x4", value: 4},
        {label: "8x8", value: 8},
        {label: "10x10", value: 10},
    ];

    const minesOptions = [
        {label: "4", value: 4},
        {label: "8", value: 8},
        {label: "10", value: 10},
        {label: "16", value: 16},
    ];
    const onChangeSize = (e) => {
        setSize(e.target.value);
    };
    const onChangeMines = (e) => {
        setMines(e.target.value);
    };

    const onChangeID = (e)=>{
        setGameId(e.target.value)
    }
    // {userid && (
    const style = { background: '#0092ff', padding: '8px 0' };
    return (
        <div>
            {userid&&
                <div>
                    <Row gutter={[16, 24]}>
                        <Col span={12}>
                            Size: <Radio.Group options={sizeOptions} onChange={onChangeSize} value={size} optionType="button"  buttonStyle="solid"/>
                        </Col>
                        <Col span={12}>
                            Mines
                            <Radio.Group options={minesOptions} onChange={onChangeMines} value={mines} optionType="button"   buttonStyle="solid"/>
                        </Col>
                        <Col span={24}>
                            <Button type="primary" onClick={onClickStart} block>
                                START NEW GAME
                            </Button>
                        </Col>
                    </Row>
                    <Row gutter={[16, 24]}>
                        <Col span={12}>
                            ID:
                            <Input value={gameId} onChange={onChangeID} placeholder="Type the game ID" />
                        </Col>
                        <Col span={12}>
                            <Button type="primary" onClick={onClickLoad} block>
                                Load Game
                            </Button>
                        </Col>
                    </Row>
                </div>
            }
        </div>
    );
};

export default CreateGame;
