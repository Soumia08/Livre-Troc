import { React , useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from '../images/Logo.png'
import { Navbar, Container, Nav, Button, Form, FormControl } from 'react-bootstrap';
import { AUTH_TOKEN_KEY } from "../App";
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function Header({ userInfo, setUserInfo }) {
    const history = useNavigate();
    const signout = () => {
         setUserInfo(null)
       sessionStorage.removeItem(AUTH_TOKEN_KEY)
       history('/login')
    }

    const[new_mot, setNew_mot] = useState('');    
    const handleSubmit = (e) => {
          e.preventDefault();    
      }; 
            return ( <div>
                <div className="headerTop">
                    
                     <Navbar bg="light" expand="lg" >
                        <Container>
                        <Navbar.Brand href="#" >
                        <img src={logo} alt="Logo" height={80} loading="lazy"/>
                        </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Navbar.Brand className="mr-auto" >
                    <h2  > Bienvenue {userInfo} dans Livre Troc  ! </h2>
                        </Navbar.Brand>
                 <Form className='d-flex mx-auto' onSubmit={handleSubmit}>
            <FormControl  value={new_mot}  type="text"  placeholder="Rechercher un livre, un auteur ou une catégorie ..."    onChange={(e) => setNew_mot(e.target.value)} className="me-2"  />
            
            <Button  variant="outline-success" href={`/listBooks/${new_mot}`} >  Rechercher </Button>
               
            
          </Form>
          <Button variant="danger" className="ms-auto" onClick={signout}>Déconnexion</Button>
          </Navbar.Collapse>
      </Container>
    </Navbar>
    
     </div>
<div className="headerBottom">
<Navbar bg="dark" variant="dark" expand="lg" >
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mx-auto">
      
                            <Nav.Link href="/myBooks" >Mes livres </Nav.Link>
                            <Nav.Link href="/myBorrows">Mes emprunts</Nav.Link>
                            <Nav.Link href="/listBooks">Livres disponibles</Nav.Link>
                 </Nav>
      </Navbar.Collapse>
    </Navbar>
     </div>

     </div>
    
        )
    } 