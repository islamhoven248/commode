 import Carousel from "react-bootstrap/Carousel";

const b1 = "/Banners/b1.jpg";
const b2 = "/Banners/b2.jpg";
const b3 = "/Banners/b3.jpg";
export default function HomeCarousel() {
  return (
    <div className="carousel-wrapper">
      <Carousel fade interval={2500} pause={false}>
        <Carousel.Item>
          <img src={b1} className="d-block w-100" />
        </Carousel.Item>
        <Carousel.Item>
          <img src={b2} className="d-block w-100" />
        </Carousel.Item>
        <Carousel.Item>
          <img src={b3} className="d-block w-100" />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
