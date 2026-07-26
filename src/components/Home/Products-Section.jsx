import { Container, Row, Col } from "react-bootstrap";
import ProductCard from "../Products/Product-Card";
import "./Home.css";

export default function ProductSection({ title, data }) {
  if (!data.length) return null;
  const title1 = title || "Search Results";
  return (
    <section className="product-section py-5">
      <Container>
        <h2 className="section-title text-center mb-4">{title1}</h2>
        <Row className="g-4 justify-content-center">
          {data.map((item, index) => (
            <Col
              key={item.id}
              md={4}
              sm={6}
              xs={12}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <ProductCard item={item} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
