import React, {useEffect, useState} from "react";
import {CellStyled, CellContent} from "./styled";

const Cell = (props) => {
    const {onClick, onContextMenu, flag, value, mine, visible, id} = props;
    const [content, setContent] = useState("");

    useEffect(() => {
        let newValue = "";
        if (!visible) {
            if (flag) {
                newValue = "🚩";
            }
        } else {
            if (mine) {
                newValue = "💣";
            } else {
                newValue = value;
            }
        }
        // FIXME delete this
        setContent(newValue);
    }, [flag, visible]);

    const onClickCell = () => {
        onClick(id);
    };
    const onRightClick = (e) => {
        e.preventDefault();
        onContextMenu(id);
    };
    return (
        <CellStyled onClick={onClickCell} onContextMenu={onRightClick} visible={visible} flag={flag} mine={mine}>
            <CellContent>{content!==0&&content}</CellContent>
        </CellStyled>
    );
};

export default Cell;
