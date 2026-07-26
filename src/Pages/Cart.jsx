import {  useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import productImages from "../assets/Products/Images/Images";
import { Col, Container, Button, Row } from "react-bootstrap";
import {removeFromCart,increaseOne,decreaseOne,applyPromoCode,} from "../Redux/Slice/cartSlice";
import { setProductId } from "../Redux/Slice/productSlice";
import { useNavigate } from "react-router-dom";
import "./Pages.css";
export default function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inpRef = useRef(null);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const itemInCart = useSelector((state) => state.cart.cartItem);
  const discountDone = useSelector((state) => state.cart.discountDone);
  const appliedPromo = useSelector((state) => state.cart.appliedPromo);
  const [msg, setMsg] = useState(null);

  const Openid = (item) => {
    dispatch(setProductId(item));
    navigate(`/product/${item.id}`);
  };

  const promoCode = () => {
  const code = inpRef.current.value.trim();
  if (!code) {
    setMsg("Please enter a promo code.");
    return;
  }
  dispatch(applyPromoCode(code));
  if (discountDone && appliedPromo) {
    setMsg(
      `Promo Code Applied: ${appliedPromo.code} - ${appliedPromo.discount * 100}% OFF`
    );
  } else {
    setMsg("Invalid Promo Code.");
  }
};
  
  return (
    <Container className="cart-page py-5"
    style={{marginTop:"150px"}}>
      <h2 className="cart-title text-center mb-5">Your Cart</h2>

      <Row className="gy-4">
        <Col lg={7}>
          {itemInCart.length === 0 && (
            <p className="empty-cart text-center">
              Your cart is currently empty
            </p>
          )}

          {itemInCart.map((item) => (
            <div
              key={item.id}
              className="cart-item glass-box d-flex align-items-center"
            >
              <div className="cart-img">
                <img
                  src={productImages[item.imgUrl]}
                  alt={item.productName}
                />
              </div>

              <div className="cart-info flex-grow-1">
                <h4
                  className="cart-product-name"
                  onClick={() => Openid(item)}
                >
                  {item.productName}
                </h4>

                <div className="cart-meta">
                  <span>${item.price}</span>
                  <span>x {item.qty}</span>
                </div>

                <div className="cart-total-item">
                  Total: ${item.price * item.qty}
                </div>

                <div className="quantity-controls">
                  <Button onClick={() => dispatch(decreaseOne({ id: item.id }))}>
                    -
                  </Button>
                  <span>{item.qty}</span>
                  <Button onClick={() => dispatch(increaseOne({ id: item.id }))}>
                    +
                  </Button>
                </div>
              </div>

              <Button
                variant="outline-danger"
                onClick={() => dispatch(removeFromCart({ id: item.id }))}
              >
                ✕
              </Button>
            </div>
          ))}
        </Col>

        <Col lg={5}>
          <div className="summary-box glass-box">
            <h3>Order Summary</h3>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <span>$30</span>
            </div>

            <div className="promo-box">
              <input ref={inpRef} placeholder="Promo code" />
              <button onClick={promoCode}>Apply</button>
            </div>

            <small className="promo-msg">{msg}</small>

            <div className="summary-total">
              <span>Total</span>
              <span>
                {itemInCart.length > 0
                  ? (totalPrice + 30).toFixed(2)
                  : "0.00"}
                $
              </span>
            </div>

            <Button variant="warning" className="checkout-btn">
              Proceed to Checkout
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
