import React, { useState } from "react";
import styled from "styled-components";

const StyledInput = styled.input`
    background-color: #fff;
    border: 2px solid #676127;
    padding: 5px 15px;
    border-radius: 20px;
    width: clamp(250px, 25%, 40%);
    outline: none;
    margin-top: ${props => props.$mt ? props.$mt + 'px' : 0}
`

const StyledDiv = styled.div`
    position: absolute;
    width: 30px;
    height: 30px; 
    left: calc(100% - 18px); 
    top: 50%;
    transform: translate(-50%, -50%); 
    background: ${props => props.$active ? "#8d8537" : "gray"};
    box-shadow: ${props => props.$active ? "0 0 5px 1px #8d8537" : "0 0 3px 1px gray"};
    padding: 10px;
    border-radius: 50%;
    cursor: pointer;
    transition: all .5s
`

const Search = ({type, value, onChange = () => {}, placeholder, mt}) => {
    const [isActive, setIsActive] = useState(false)

    return ( 
        <span style={{position: "relative"}} onFocus={() => setIsActive(true)} onBlur={() => setIsActive(false)} tabIndex={0}>
            <StyledInput 
                type={type ? type : 'text'} 
                value={value ? value : ''}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder ? placeholder : ''}
                $mt={mt}
            />
            <StyledDiv $active={isActive} >
                <svg xmlns="http://www.w3.org/2000/svg" style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}  width={"18px"} height={"18px"} fill={"white"} className="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                </svg>
            </StyledDiv>
        </span>
     );
}
 
export default Search;