import React from "react";
import styled from "styled-components";
import { useAppState } from "../store";
import { StyledButton } from "./Button";

const StyledModalBackgroundContainer = styled.div`
    background-color: rgba(0,0,0,0.3);
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    animation-name: show;
    animation-duration: .4s;


    @keyframes show {
        from { opacity: 0}
        to { opacity: 1}
    }
`

const StyledModalContainer = styled.div`
    background-color: white;
    width: 400px;
    height: 250px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

const StyledCross = styled.div`
    position: absolute;
    top: 10px;
    right: 15px;
    cursor: pointer;
`

const StyledInput = styled.input`
    width: clamp(200px, 70%, 400px);
    border: none;
    box-shadow: 1px 1px 5px 1px #a5a5a5;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 3px 10px;
    outline: none;
`

const StyledModalButton = styled(StyledButton)`
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translate(-50%, 0);
    border-radius: 8px;
    &:hover {
        transform: translate(-50%, -2%) scale(1.02);
        box-shadow: 0px 2px 4px #c7c7c7;
    }
`

const Cross = ({setIsModalActive}) => {

    return (
        <StyledCross onClick={() => setIsModalActive(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
            </svg>
        </StyledCross>
    )
}

const Modal = ({createRoom}) => {
    const isModalActive = useAppState(state => state.isModalActive);
    const setIsModalActive = useAppState(state => state.setIsModalActive);
    const createRoomName = useAppState(state => state.createRoomName);
    const setCreateRoomName = useAppState(state => state.setCreateRoomName);

    const createRoomHnadler = () => {
        createRoom();
        setIsModalActive(false);
        setCreateRoomName('')
    }

    return (
        <>
           { isModalActive ? (
                <StyledModalBackgroundContainer>
                    <StyledModalContainer>
                        <Cross 
                            setIsModalActive={setIsModalActive}
                        />
                        <StyledInput 
                            type="text" 
                            placeholder="Enter room name"
                            value={createRoomName} 
                            onChange={(e) => setCreateRoomName(e.target.value)}
                        />
                        <StyledModalButton 
                            $color={'#8d8537'} 
                            $outline 
                            $borderColor={"#8d8537"} 
                            onClick={createRoomHnadler}
                        >Create</StyledModalButton>
                    </StyledModalContainer>
                </StyledModalBackgroundContainer>
            ) 
            : null}
        </>
        
    )
}

export default Modal;