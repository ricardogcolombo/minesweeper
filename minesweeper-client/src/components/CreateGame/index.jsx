import React, {useState, useContext} from "react";
import {Input, Button, Radio, Row, Col} from "antd";
import {StateContext} from "../../context/index";
import {useHistory} from "react-router-dom";

const CreateGame = () => {
    const {
        state: {userid},
    } = useContext(StateContext);
    const [size, setSize] = useState(0);
    const [mines, setMines] = useState(0);
    const history = useHistory();
    const onClickStart = () => {
        history.push("/Game");
    };

    const onClickLoad = () => {};

    const sizeOptions = [
        {label: "4x4", value: 4},
        {label: "8x8", value: 8},
        {label: "10x10", value: 10},
    ];

    const minesOptions = [
        {label: "4x4", value: 4},
        {label: "8x8", value: 8},
        {label: "10x10", value: 10},
    ];
    const onChangeSize = (e) => {
        setSize(e.target.value);
    };
    const onChangeMines = (e) => {
        setMines(e.target.value);
    };

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
                            <Input placeholder="Type the game ID" />
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
