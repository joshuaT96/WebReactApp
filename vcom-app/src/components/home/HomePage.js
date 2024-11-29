import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Link from 'react-bootstrap/NavLink';

function HomePage() {
    return(
        <Container>
             <Row className="px-4 my-5">
                <Col xs={4} sm={6}>
                    <Image 
                        src="/img/pv-panel.png" 
                        fluid  />
                </Col>
                <Col sm={6}>
                    <h1 className="font-weight-light">VCOM app</h1>
                    <p className="mt-4">
                        Hello
                        <br /><br />
                        TEXT
                    </p>
                    <Link
                        to ={{ pathname: '/contacts' }}>
                        <Button variant="outline-primary">push button &gt;&gt;</Button>
                    </Link>
                </Col>
             </Row>
        </Container>
    )
}

export default HomePage;