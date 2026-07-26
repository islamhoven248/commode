import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './all.css';

export default function Footer() {
  return (
    <footer className="footer-section">
      <Container>
        <Row> <img src="/logopng.png" alt="Commode Logo" style={{width:"160px"}} /></Row>
        <Row>
          <Col md={4} className="mb-4">
           <h4>Commode Store</h4>
            <p>Discover top-quality products at amazing prices. Shop smart, live stylish.</p>
            <div className="social-icons d-flex gap-3 mt-3">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-whatsapp"></i></a>
              <a href="#"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </Col>

          <Col md={2} className="mb-4">
            <h5>Shop</h5>
            <ul className="list-unstyled">
              <li><a href="#">New Arrivals</a></li>
              <li><a href="#">Best Sellers</a></li>
              <li><a href="#">Electronics</a></li>
              <li><a href="#">Fashion</a></li>
            </ul>
          </Col>

          <Col md={2} className="mb-4">
            <h5>Support</h5>
            <ul className="list-unstyled">
              <li><a href="#">Contact</a></li>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Shipping</a></li>
              <li><a href="#">Returns</a></li>
            </ul>
          </Col>

          <Col md={4} className="mb-4">
            <h5>Stay Updated</h5>
            <p>Get our latest updates and promotions straight to your inbox.</p>
            <input type="email" className="form-control mb-2" placeholder="Email address" />
            <button className="btn w-100">Subscribe</button>
          </Col>
        </Row>
        <hr />
        <p className="text-center text-light mt-3">&copy; 2026 Commode Store. All rights reserved.</p>
      </Container>
    </footer>
  );
}
