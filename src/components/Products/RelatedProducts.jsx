import { useDispatch, useSelector } from "react-redux";
import productImages from "../../assets/Products/Images/Images";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./Products.css";
import { useNavigate } from "react-router-dom";
import { setProductId } from "../../Redux/Slice/productSlice";

export default function RelatedProducts({ category }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const Openid = (item) => {
      dispatch(setProductId(item));
      navigate(`/product/${item.id}`);
    };
  const products = useSelector(state => state.product.items);

  const related = products.filter(
    p => p.category === category
  );

  if (!related.length) return null;

  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      spaceBetween={30}
      slidesPerView={4}
      navigation
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        0: { slidesPerView: 1 },
        576: { slidesPerView: 2 },
        992: { slidesPerView: 3 },
        1200: { slidesPerView: 4 },
      }}
      className="related-swiper"
    >
      {related.map(item => (
        <SwiperSlide key={item.id}>
          <div className="related-card text-center"
          onClick={() => Openid(item)}>
            <img
              src={productImages[item.imgUrl]}
              alt={item.productName}
            />
            <p>{item.productName}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
