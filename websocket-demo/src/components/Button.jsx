import styled from "styled-components";

export const StyledButton = styled.button`
    padding: 3px 12px;
    background-color: ${props => props.$outline ? "transparent" : props.$bgColor ? props.$bgColor : ""};
    color: ${props => props.$color ? props.$color : ""};
    border: ${props => props.$borderColor ? `1px solid ${props.$borderColor}`  : ""};
    border-radius: ${props => props.$brRadius ? props.$brRadius + "px" : ""};
    width: ${props => props.$width ? props.$width : ""};
    height: fit-content;
    transition: all .2s ease-in-out;
    &:hover {
        background-color: #e2e2e240;
        transform: translate(0, -1px);
    }
`
