import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Buscador from './Buscador';


function Header({countries, setFilteredCountries}) {
  return (
    <>
      {[false].map((expand) => (
        <Navbar bg="dark" data-bs-theme="dark" key={expand} expand={expand} className="bg-body-tertiary mb-3">
          <Container fluid>
            <Navbar.Brand href="#"
            ><img
            alt=""
            src="../src/assets/img/Conmebol.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
              Tabla de posiciones CONMEBOL 2026</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title bg="dark" data-bs-theme="dark" id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Puntos importantes:
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body >
              <Nav className="fw-bolder">
              <p>Columnas resaltadas con <span className="bg-warning">amarillo</span> indican cupos directos al Mundial.</p>
              </Nav>
              <Nav className="my-2 fw-bolder"><p>Columna resaltada en <span className="bg-primary">azul</span> irá a repechaje.</p></Nav>
              <Nav className="my-2">Puedes ordenar los datos a gusto clickeando en el título de la columna que desea modificar.</Nav>
                <Buscador variant="outline-success" className="my-3" countries={countries} setFilteredCountries={setFilteredCountries} />
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default Header;