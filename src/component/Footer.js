import { Container } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-light py-3">
      <Container>
        <div className="text-center">
          <p> Copyright © Livre Troc  - 
            { new Date().getFullYear()} - Tous droits réservés.</p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;