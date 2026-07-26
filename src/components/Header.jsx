import { useEffect, useState,useRef} from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./all.css";

export default function Header() {
  const itemsInCart = useSelector(state => state.cart.cartItem || []);
  const [show, setShow] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const lastScrollY = useRef(0);

  const closeMenu = () => setExpanded(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY.current) {
        setShow(false);
      } else {
        setShow(true);
      }
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`floating-navbar ${show ? "show" : "hide"}`}>
      <Navbar
        expand="lg"
        expanded={expanded}
        onToggle={setExpanded}
        className="glass-navbar"
      >
        <Container>
          <Navbar.Brand as={Link} to="/" className="brand-logo d-flex align-items-center gap-2">
  <img
    src="/logopng.png"
    alt="Commode Logo"
    className="brand-icon"
  />
  <span>COMMODE</span>
</Navbar.Brand>
          <Navbar.Toggle />

          <Navbar.Collapse>
            <Nav className="mx-auto align-items-center gap-3">
              <Nav.Link
                as={NavLink}
                to="/products"
                className="nav-link"
                onClick={closeMenu}
              >
                All Products
              </Nav.Link>

              <NavDropdown title="Chairs" className="nav-link">
                <NavDropdown.Item
                  as={Link}
                  to="/products?category=chair"
                  onClick={closeMenu}
                >
                  All Chairs
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="/products?category=chair&type=office"
                  onClick={closeMenu}
                >
                  Office Chair
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="/products?category=chair&type=wooden"
                  onClick={closeMenu}
                >
                  Wooden Chair
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Sofas" className="nav-link">
                <NavDropdown.Item
                  as={Link}
                  to="/products?category=sofa"
                  onClick={closeMenu}
                >
                  All Sofas
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>

            <Nav>
              <Nav.Link
                as={Link}
                to="/cart"
                className="cartIconBar"
                onClick={closeMenu}
              >
                <i className="fa fa-cart-shopping"></i>
                <span className="cart-counter">{itemsInCart.length}</span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
