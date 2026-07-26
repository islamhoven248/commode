import { createSlice } from "@reduxjs/toolkit";


const productSlice = createSlice({
  name: "product",
  initialState: {
    items: [], 
    product: {}, 
  },
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload; 
    },
    setProductId: (state, action) => {
      state.product = action.payload; 
      
    },
  },
});


export const { setProducts, setProductId } = productSlice.actions;

export default productSlice.reducer; 
