import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Header from "./components/Header";
import styled from "styled-components";
import Search from "./components/Search";
import RoomsList from "./components/RoomsList";
import Modal from "./components/Modal";
import { useAppState } from "./store"; 
import Room from "./components/Room";


const socket = io("http://localhost:3001");

const StyledContainer = styled.div`
    text-align: ${props => props.$center ? "center" : "none"};
    margin-top: ${props => props.$mt ? props.$mt + "px" : 0};
`

const StyledButton = styled.button`
  background-color: #8d8537;
  color: #fff;
  border-radius: 7px;
  padding: 5px 0;
  width: clamp(100px, 18%, 200px);
  border: none;
  box-shadow: 1px 1px 3px 1px #000;
  margin: 0 20px;
  font-size: clamp(12px, 1.5vw, 16px);
`

const StyledMain = styled.main`
  background: #e9e9e9;
  background-size: cover;
  min-height: 100vh;
  user-select: none;
`

function App() {
  
  const { 
    currentRoom, 
    createRoomName, 
    setCurrentRoom, 
    setIsModalActive, 
    setUsers,
    setMessages,
    setRooms,
    rooms,
    setSearchRoomName,
    searchRoomName,
    setSocketId
  } = useAppState()


  useEffect(() => {
    socket.on("roomsUpdate", rooms => setRooms(rooms))

    socket.on("roomUsersUpdate", (users) => {
      setUsers(users);
    });

    socket.on("messagesUpdate", (messages) => {
      setMessages(messages.reverse())
      console.log('dsad')
    });

    return () => {
      socket.off("roomUpdate");
    };
  }, []);

  const openModal = () => {
    setIsModalActive(true)
  }

  const createRoom = () => {
    socket.emit("createRoom", createRoomName, (response) => {
      console.log("Room is created")
    });
  };

  const joinRoom = (roomName) => {
    socket.emit("joinRoom", roomName, (response) => {
      if (response.success) {
        setCurrentRoom(roomName);
        setSocketId(socket.id)
      } 
    });
  };

  const leaveRoom = (roomName) => {
    socket.emit("leaveRoom", roomName, (response) => {
      if (response.success) {
        setCurrentRoom(null);
        setUsers([]);
      } 
    });
  };

  const enterMessage = (currentRoom, messageText) => {
    socket.emit("enterMessage", currentRoom, messageText, (res) => {
      console.log(res)
    })
  }

  return (
    <StyledMain>
      <Header/>
      {!currentRoom ? (
        <>
          <Modal createRoom={createRoom}/>
          <StyledContainer $center $mt={15}>
            <h1 style={{color: '#8d8537'}}>Game Room</h1>
            <div style={{width: "25vw", border: "1px solid #803407", margin: "20px auto"}}></div>
              <Search  
                type={"text"}
                value={searchRoomName}
                onChange={setSearchRoomName}
                placeholder={"Search by room name"}
                mt={30}
              />  
              <StyledContainer $mt={30}>
                <StyledButton onClick={openModal}>Create Room</StyledButton>
              </StyledContainer>
              <RoomsList rooms={rooms} joinRoom={joinRoom}/>
          </StyledContainer>
        </>
      ) : <Room leaveRoom={leaveRoom} enterMessage={enterMessage}/>}

      
    </StyledMain>
  );
}

export default App;
