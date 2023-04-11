import { React, useState} from "react";

import logo from '../images/Logo.png'
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
// import"../styles/Header.scss"
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function HeaderGreen() {
    
        return ( 
                        <Navbar bg="light" expand="lg">
                        <Container>
                        <Navbar.Brand href="#" >
                        <img src={logo} alt="Logo" height={80} loading="lazy"/>
                        </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Navbar.Brand className="mx-auto" >
                    <h2  > Bienvenue dans Livre Troc  ! </h2>
                        </Navbar.Brand>
            
                <Nav className="me-auto">
            
                </Nav>
                <Nav>
                <a href="/login">
                <Button variant="outline-dark" className="me-2"> Connexion </Button>
                </a>
                <a href="/addUser">
                <Button variant="dark"> Inscription</Button>
                </a>
                </Nav>
            </Navbar.Collapse>
            </Container>
            </Navbar>
                        

       )
      }


    





