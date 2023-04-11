import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';

function HeaderBottom() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
      
                            <Nav.Link href="/myBooks">Mes livres </Nav.Link>
                            <Nav.Link href="/myBorrows">Mes emprunts</Nav.Link>
                            <Nav.Link href="/listBooks">Livres disponibles</Nav.Link>
                 </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default HeaderBottom;