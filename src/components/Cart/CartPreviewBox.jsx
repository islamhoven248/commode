import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import productImages from "../../assets/Products/Images/Images";

export default function CartPreviewBox() {
  const cartItems = useSelector(state => state.cart.cartItem);
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);

  if (!cartItems.length || !visible) return null;

  const lastItem = cartItems[cartItems.length - 1];

  return (
    <div className="cart-preview-box">
      <button
        className="close-btn"
        onClick={() => setVisible(false)}
      >
        ×
      </button>

      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-3">
          <img src={productImages[lastItem.imgUrl]} width="50" />
          <span>{lastItem.productName}</span>
        </div>

        <Button variant="warning" onClick={() => navigate("/cart")}>
          Checkout
        </Button>
      </div>
    </div>
  );
}
