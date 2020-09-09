import styled from "styled-components";

export const BoardStyled = styled.div`
    padding: 1px;
    display: grid;
    grid-template-columns: ${({size}) => {
        return `repeat(${size},1fr)`;
    }};
    grid-gap: 1px;
    grid-auto-rows: 50px;
`;

export const BoardContainerStyled = styled.div`
    width: 50%;
    margin: auto;
`;


export const TimerStyled = styled.div`
    font-size:30px;
    text-align:center;
`;
