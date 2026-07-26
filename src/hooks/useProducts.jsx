import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setProducts } from "../Redux/Slice/productSlice";
import productsData from "../assets/Products/Products.json";

export default function useProducts() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setProducts(productsData));
  }, [dispatch]);
  console.log("IMPORTED PRODUCTS:", productsData.length);

}
