import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../Redux/Slice/cartSlice";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { setProductId } from "../Redux/Slice/productSlice";
import RelatedProducts from "../components/Products/RelatedProducts";
import CartPreviewBox from "../components/Cart/CartPreviewBox";
import productImages from "../assets/Products/Images/Images";
import "./Pages.css";
import ProductGallery from "../components/Products/ProductGallery";

export default function Product() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const product = useSelector((state) => state.product.product);
  const products = useSelector((state) => state.product.items);
  const cartItems = useSelector((state) => state.cart.cartItem);

  useEffect(() => {
    if (!product?.id && products.length) {
      const foundProduct = products.find(
        (p) => String(p.id) === String(id)
      );
      if (foundProduct) {
        dispatch(setProductId(foundProduct));
      }
    }
  }, [id, product?.id, products, dispatch]);

  if (!product?.id) {
    return <p className="text-center my-5">Loading...</p>;
  }

  return (
    <>
      {/* ===== Product Hero ===== */}
      <section className="product-hero">
  <Container>
    <Row className="product-hero-box align-items-center">
      
      {/* IMAGE */}
      <Col md={6} className="text-center">
        <div className="product-image-box">
          <img
            src={productImages[product.imgUrl]}
            alt={product.productName}
          />
        </div>
      </Col>

      {/* INFO */}
      <Col md={6}>
        <div className="product-info-box">

          {product.isBestSeller && (
            <Badge bg="warning" className="mb-2 text-dark">
              Best Seller
            </Badge>
          )}

          <h1>{product.productName}</h1>
          <p className="short-desc">{product.shortDesc}</p>

          {/* PRICE */}
          <div className="price-box">
            {product.oldPrice && (
              <span className="old-price">${product.oldPrice}</span>
            )}
            <span className="new-price">${product.price}</span>
          </div>

          {/* COLORS */}
          {product.colors?.length > 0 && (
            <div className="color-box">
              {product.colors.map((color, i) => (
                <span
                  key={i}
                  className="color-circle"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          )}

          <p className="description">{product.description}</p>

          <Button
            variant="warning"
            size="lg"
            onClick={() => dispatch(addToCart(product))}
          >
            Add To Cart
          </Button>

        </div>
      </Col>

    </Row>
  </Container>
</section>
{/* BooMBoomBoom */}
{product?.gallery && (
  <ProductGallery images={product.gallery} />
)}

{/* ===== Reviews Section ===== */}
<section className="reviews-section">
  <Container>
    <h2 className="section-title text-center mb-4">
      Customer Reviews
    </h2>

    <div className="review-box">
      <p>"Amazing quality and comfort!"</p>
      <span>- Ahmed</span>
    </div>
  </Container>
</section>

      {/* ===== Related Products ===== */}
      <section className="related-section">
        <Container>
          <h2 className="section-title text-center mb-4">
            You may also like
          </h2>
          <RelatedProducts category={product.category} />
        </Container>
      </section>

      {cartItems.length > 0 && <CartPreviewBox />}
    </>
  );
}
