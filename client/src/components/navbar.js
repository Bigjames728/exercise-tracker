import React, { Component } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap'

export default class NavBar extends Component {
    render() {
        return (
            <Navbar bg="primary" variant="dark">
                <Container>
                <Navbar.Brand href="/">Exercise Tracker</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Exercises</Nav.Link>
                        <Nav.Link href="/create">Create Exercise</Nav.Link>
                        <Nav.Link href="/register">Create User</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        )
    }
}


