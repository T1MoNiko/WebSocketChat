import { useAppState } from "../store";
import { StyledButton } from "./Button"; 
import styled from "styled-components";


const StyledDiv = styled.div`
    position: relative;
    background-color: white;
    border-radius: 30px;
    padding: 10px 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 1px 1px 5px 0 #9d9393;
    margin-top: 10px;
`

const StyledCount = styled.span`
    position: absolute;
    top: 50%;
    right: 100px;
    transform: translate(0, -50%)
`


const RoomBlock = ({joinFunc, room}) => {

    return ( 
        <StyledDiv>
            <p style={{color: "#141414", fontSize: "18px", margin: 0}}>{room.roomName}</p>
            <StyledCount>{room.users.length + '/10'}</StyledCount>
            <StyledButton 
                $brRadius={15} 
                $borderColor={"#8d8537"} 
                $outline 
                $color={"#8d8537"} 
                onClick={() => joinFunc(room.roomName)}
            >Join</StyledButton>
        </StyledDiv>
     );
}
 
export default RoomBlock;