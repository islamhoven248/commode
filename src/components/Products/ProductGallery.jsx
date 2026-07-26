import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import productImages from "../../assets/Products/Images/Images";
import "./Products.css"

export default function ProductGallery({ images = [] }) {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: "ease-out-quart",
      once: true,
    });
  }, []);

  // Guard
  if (!Array.isArray(images) || images.length < 4) return null;

  return (
    <section className="product-gallery-section">
      <div className="gallery-grid">
        {images.slice(0, 4).map((img, i) => (
          <div
            key={i}
            className={`gallery-item item-${i + 1}`}
            data-aos="zoom-out"
            data-aos-delay={i * 250}
            data-aos-easing="ease-out-cubic"
          >
            <img src={productImages[img]} alt="" />
          </div>
        ))}
      </div>
    </section>
  );
}
