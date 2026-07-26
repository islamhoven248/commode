import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "./Redux/Slice/productSlice";
import { setCartFromStorage } from "./Redux/Slice/cartSlice";

import productsData from "./assets/Products/Products.json";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollWindow from "./assets/assets/scrollWindow";
import ScrollToTopButton from "./assets/assets/ScrollToUpButton";
import AOS from "aos";
import "aos/dist/aos.css";
// Lazy load the page components
const Home = lazy(() => import("./Pages/Home"));
const Products = lazy(() => import("./Pages/Products"));
const Product = lazy(() => import("./Pages/Product"));
const Cart = lazy(() => import("./Pages/Cart"));

function App() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.items);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  useEffect(() => {
    if (!products.length) {
      dispatch(setProducts(productsData));
    }
  }, [products.length, dispatch]);
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      dispatch(setCartFromStorage(JSON.parse(savedCart)));
    }
  }, [dispatch]);
  return (
    <Router>
      <ScrollWindow />
      <Header />

      <Suspense
        fallback={
          <div className="loader-overlay">
            <img src="/logopng.png" className="loader-logo" />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Suspense>

      <Footer />
      <ScrollToTopButton />
    </Router>
  );
}

export default App;
