import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';

const StyledNavbar = styled(Navbar)`
    background-color: #141414;
    box-shadow: 0 0 5px 1px #000
`

const StyledBrand = styled(Navbar.Brand)`
    color: white;
    &:hover {
        color: #fff
    }
`

const Header = React.memo(() => {
    return ( 
        <StyledNavbar expand="lg">
            <Container>
                <StyledBrand href="#home">WebSocketChat</StyledBrand>
            </Container>
        </StyledNavbar>
     );
})
 
export default Header;