import React from "react";
import { useAppState } from "../store";
import { Container } from "react-bootstrap";
import { StyledButton } from "./Button";
import styled from "styled-components";

const StyledContainer = styled(Container)`
    width: clamp(500px, 40%, 50%);
    min-height: 88vh;
    border-radius: 30px;
    box-shadow: 0 0 4px 1px #9d9393;
    background-color: white;
    margin-top: 15px;
    padding: 0;
    display: flex;
    flex-direction: column;
    animation-name: appearance;
    animation-duration: .5s;
    @keyframes appearance {
        from {
            opacity: 0;
            transform: scale(0.1);
        } to {
            opacity: 1;
            transform: scale(1);
        }
    }
`

const StyledMessagesContainer = styled.div`
    flex-grow: 1;   
    padding: 10px 20px;
    display: flex;
    flex-direction: column-reverse;
    overflow-y: scroll;
    max-height: 73vh;
`

const StyledSendButton = styled(StyledButton)`
    position: absolute;
    width: fit-content;
    transform: translate(0, -50%);
    right: 2px;
    top: 50%;
    border: none;
    box-shadow: 0px 0px 3px 1px #9d9393;
    &:hover {
        transform: translate(0, -50%);
        background-color: #aca23a;
    }
`

const StyledMessage = styled.p`
    background-color: ${(props) => props.$self ? "#a49a42" : "#9b9b9b"};
    color: white;
    text-align: ${(props) => props.$self ? "right" : "left"};
    border-radius: 20px;
    align-self: ${(props) => props.$self ? "flex-end" : "flex-start"};
    padding: 5px 10px;
    margin-bottom: 5px;
    max-width: 48%;
    word-wrap: break-word;
    text-align: start;
`

const StyledImg = styled.img`
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translate(-50%, 0);
    width: 300px;
`

const Room = ({leaveRoom, enterMessage}) => {
    const currentRoom = useAppState(state => state.currentRoom)
    const messages = useAppState(state => state.messages)
    const setMessageText = useAppState(state => state.setMessageText)
    const messageText = useAppState(state  => state.messageText)
    const socketId = useAppState(state  => state.socketId)

    const sendMessageHandler = () => {
        enterMessage(currentRoom, messageText)
        setMessageText('')
    }

    const enterDownHandler = (e) => {
        if (e.key === "Enter") {
            sendMessageHandler()
        }
    }

    return ( 
        <StyledContainer>
            <div style={{width: "100%", paddingTop: "7px", borderBottom: "1px solid #9d9393"}}>
                <h4 style={{textAlign: "center", marginTop: "10px", color: "#8d8537"}}>{currentRoom}</h4>    
            </div>
            <StyledMessagesContainer>
                {messages.length ? messages.map((item) => (
                    <StyledMessage $self={item.user === socketId}>{item.message}</StyledMessage>
                )) : (<StyledImg src="/emptyChat.png" alt='' />)}
            </StyledMessagesContainer>
            <div style={{padding: "0 20px 10px 20px", display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
                <StyledButton 
                    $outline 
                    $color={"red"} 
                    $brRadius={20} 
                    $borderColor={'red'} 
                    onClick={() => leaveRoom(currentRoom)}
                >Exit</StyledButton>
                <div style={{position: 'relative', padding: "1px 0", borderRadius: "20px",  width: "85%", textAlign: "start", border: '1px solid black'}}>
                    <input  
                        type="text"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyDown={enterDownHandler}
                        placeholder="Enter message"
                        style={{width: 'calc(100% - 70px)', outline: 'none', borderRadius: "20px 0 0 20px", padding: '5px 10px', border: 'none',}}
                    />
                    <StyledSendButton 
                        $color={"white"} 
                        $brRadius={20} 
                        $bgColor={"#8d8537"} 
                        onClick={sendMessageHandler}
                    >send</StyledSendButton>
                </div>
            </div>
        </StyledContainer>
     );
}
 
export default Room;