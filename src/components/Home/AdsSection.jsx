import { Container, Row, Col } from "react-bootstrap";
import "./Home.css";
export default function AdsSection() {
  return (
    <section className="ads-section py-5">
      <Container>
        <Row className="g-4">
          <Col md={6}>
            <div className="ad-box">Up to 30% OFF</div>
          </Col>
          <Col md={6}>
            <div className="ad-box">Easy Installments Available</div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
