import React from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import { Route, NavLink, Switch } from 'react-router-dom';
import './Navbar.css';
import Home from './Home';

const MovieNavbar = () => {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" variant="light" sticky="top" className="bg-light">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Brand >
                    <Nav.Link as={NavLink} to="/">
                        <strong className="brand">Movie Finder</strong>
                    </Nav.Link>
                </Navbar.Brand>
            </Navbar>
            <Switch>
                <Route path="/" component={Home} exact />
            </Switch>
        </>
    )
}

export default MovieNavbar;