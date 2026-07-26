import productImages from "../../assets/Products/Images/Images";
import { useDispatch } from "react-redux";
import { setProductId } from "../../Redux/Slice/productSlice";
import { addToCart } from "../../Redux/Slice/cartSlice";
import { useNavigate } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Badge } from "react-bootstrap";


import "../Home/Home.css";

export default function ProductCard({ item }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const openProduct = () => {
    dispatch(setProductId(item));
    navigate(`/product/${item.id}`);
  };

  const renderStars = (rating) => {
   const fullStars = Math.floor(rating);
    return [...Array(5)].map((_, i) => (
      <i
        key={i}
        className={`fa fa-star ${i < fullStars ? "active" : ""}`}
      />
    ));
  };

  return (
    <div className="product-card">
      <div className="product-img-wrapper" onClick={openProduct}>
        {item.isBestSeller && (
  <span className="badge badge-floating">Best Seller</span>
)}

        <img src={productImages[item.imgUrl]} alt={item.productName} />
      </div>

      <div className="product-body text-center">
        <h2 className="product-title">{item.productName}</h2>

        <OverlayTrigger
  placement="top"
  overlay={
    <Tooltip id={`tooltip-${item.id}`}>
      Rating: {item.avgrating}
    </Tooltip>
  }
>
  <div className="starRow">
    {renderStars(item.avgrating)}
  </div>
</OverlayTrigger>


       <div className="price mb-3">
  {item.oldPrice && (
    <span className="old-price">${item.oldPrice}</span>
  )}
  <span className="new-price">${item.price}</span>
</div>


        <button
          className="btn btn-outline-warning w-100"
          onClick={() => dispatch(addToCart(item))}
        >
          <i className="fa fa-cart-plus me-2"></i>
          Add to Cart
        </button>
      </div>
      
    </div>
  );
}
