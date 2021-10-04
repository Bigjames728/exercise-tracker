import React, { Component } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap'

export default class NavBar extends Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Container>
                <Navbar.Brand href="/">ExerTracker</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Exercises</Nav.Link>
                        <Nav.Link href="/create">Create Exercise</Nav.Link>
                        <Nav.Link href="/user">Create User</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        )
    }
}


