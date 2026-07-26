import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import HomeCarousel from "../components/Home/Carousel";
import ProductSection from "../components/Home/Products-Section";
import useProducts from "../hooks/useProducts";
import "../components/Home/Home.css";
import AdsSection from "../components/Home/AdsSection";
export default function Home() {
  useProducts();

  const products = useSelector((state) => state.product.items);

  const bestSeller = products.filter((p) => p.isBestSeller);
  const bestPrice = products.filter((p) => p.isBestPrice);
  const newArrivals = [...products]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);

  return (
    <>
     <Container fluid className="hero-section">
  <div className="hero-overlay">
    <div className="hero-content">
      <img src="/logopng.png" alt="Commode Logo" className="hero-logo" />

      <h1 className="hero-title">
        Luxury Furniture Crafted for Comfort
      </h1>

      <p className="hero-subtitle">
        Premium designs that elevate your living space
      </p>

      <button
        className="hero-btn"
        onClick={() =>
          document.getElementById("home-products")?.scrollIntoView({ behavior: "smooth" })
        }
      >
        Explore Collection
      </button>
    </div>
  </div>
</Container>


      <HomeCarousel />
      <AdsSection />
      <Container id="home-products" className="my-5">
        <ProductSection title="Best Seller" data={bestSeller} />
        <ProductSection title="Best Price" data={bestPrice} />
        <ProductSection title="New Arrivals" data={newArrivals} />
      </Container>
    </>
  );
}
