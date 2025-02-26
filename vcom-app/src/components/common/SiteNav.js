import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
//import { NavLink } from 'react-bootstrap';

function SiteNav(props) {
    const handleLogout = () => {
        props.logOut();
    }
    return (
        <header>
            <Navbar  bg='light' expand='lg' variant='light'>      
                <Container>
                    <Navbar.Brand><Nav.Link href="/">VCOM App - Home</Nav.Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-md-auto">
                        <Nav.Link href="/contents">Contents </Nav.Link>
                        <Nav.Link href='/contents-v2'>Contents V2 </Nav.Link>
                        <Nav.Link href='/technicians'>Technicians Page</Nav.Link>
                        <Nav.Link href='/bessData'>BESS Plant Data</Nav.Link>
                        <Nav.Link onClick={handleLogout}> Logout </Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>        
            </Navbar>
        </header>
    )
}

export default SiteNav;