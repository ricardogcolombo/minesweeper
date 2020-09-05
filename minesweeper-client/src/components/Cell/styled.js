import styled from "styled-components";

export const CellStyled = styled.div`
    display: flex;
    text-align: center;
    border-radious:30px;
    background-color: ${(props) => {
        const {visible} = props;
        let color = `grey`;

        if (visible) {
            color = `white`;
        }
        return color
    }};
`;
