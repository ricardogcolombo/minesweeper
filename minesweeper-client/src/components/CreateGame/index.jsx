import React, {useState, useContext} from "react";
import { Button, Radio, Row, Col} from "antd";
import {StateContext} from "../../context/index";
import {useHistory} from "react-router-dom";

const CreateGame = () => {
    const {
        state: {tokenId},
        dispatch
    } = useContext(StateContext);
    const [size, setSize] = useState(8);
    const [mines, setMines] = useState(8);
    const [gameId] = useState(0);
    const history = useHistory();
    const onClickStart = () => {
        dispatch({type:'SET_GAMEINFO',payload:{gameinfo:{
            gameId,
            time:0,
            size,
            mines,
        },tokenId}})
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

    return (
        <div>
            {tokenId&&
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
                </div>
            }
        </div>
    );
};

export default CreateGame;
