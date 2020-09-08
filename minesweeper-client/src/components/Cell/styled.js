import styled from "styled-components";

export const CellStyled = styled.div`
    display: flex;
    text-align: center;
    border-radius: 5px;
    font-size: 150%;
    background-color: ${(props) => {
        const {visible} = props;
        let color = `#444`;

        if (visible) {
            color = `#fff`;
        }
        return color
    }};
`;

export const CellContent = styled.div`
    margin:auto;
`;

