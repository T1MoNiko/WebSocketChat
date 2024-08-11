import { Container } from "react-bootstrap";
import RoomBlock from "./RoomBlock";
import styled from "styled-components";

import React from "react";
import { useAppState } from "../store";

const StyledRoomsContainer = styled(Container)`
    width: 65%;
`

const RoomsList = ({joinRoom}) => {
    const rooms = useAppState(state => state.rooms);
    const searchRoomName = useAppState(state => state.searchRoomName)

    return ( 
        <>  
            <h2 style={{textAlign: 'center', color: 'rgb(141, 133, 55)', marginTop: '30px'}}>Rooms</h2>
            <div style={{width: "25vw", border: "1px solid #803407", margin: "20px auto"}}></div>
            {rooms.length ? (
                <StyledRoomsContainer>
                    {
                        rooms.map((room,i) => {
                            if (searchRoomName && room.roomName.toLowerCase().includes(searchRoomName.toLowerCase())) {
                                return  (
                                        <RoomBlock key={i} room={room} joinFunc={joinRoom} />
                                )  
                            } else if (!searchRoomName) {
                                return  (
                                        <RoomBlock key={i} room={room} joinFunc={joinRoom} />
                                )       
                            }     
                        }
                    ) 
                    }
                </StyledRoomsContainer>
            )
            : null}
        </>
     );
}

export default RoomsList;