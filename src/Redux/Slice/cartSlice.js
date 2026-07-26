import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItem: [],
  originalTotalPrice: 0,
  totalPrice: 0,

  promoCode: [
    { code: "Commode", discount: 0.25 },
    { code: "New", discount: 0.1 },
  ],

  discountDone: false,
  appliedPromo: null,
};

const recalcTotals = (state) => {
  state.originalTotalPrice = state.cartItem.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  if (state.discountDone && state.appliedPromo) {
    state.totalPrice =
      state.originalTotalPrice -
      state.originalTotalPrice * state.appliedPromo.discount;
  } else {
    state.totalPrice = state.originalTotalPrice;
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart: (state, action) => {
      const item = state.cartItem.find(
        (i) => i.id === action.payload.id
      );

      if (item) {
        item.qty += 1;
      } else {
        state.cartItem.push({ ...action.payload, qty: 1 });
      }

      recalcTotals(state);
      localStorage.setItem("cart", JSON.stringify(state.cartItem));
    },

    removeFromCart: (state, action) => {
      state.cartItem = state.cartItem.filter(
        (item) => item.id !== action.payload.id
      );

      recalcTotals(state);
      localStorage.setItem("cart", JSON.stringify(state.cartItem));
    },

    increaseOne: (state, action) => {
      const item = state.cartItem.find(
        (i) => i.id === action.payload.id
      );

      if (item) item.qty += 1;

      recalcTotals(state);
      localStorage.setItem("cart", JSON.stringify(state.cartItem));
    },

    decreaseOne: (state, action) => {
      const item = state.cartItem.find(
        (i) => i.id === action.payload.id
      );

      if (item && item.qty > 1) {
        item.qty -= 1;
      }

      recalcTotals(state);
      localStorage.setItem("cart", JSON.stringify(state.cartItem));
    },

    setCartFromStorage: (state, action) => {
      state.cartItem = action.payload || [];
      recalcTotals(state);
    },

    applyPromoCode: (state, action) => {
      const code = action.payload;
      const promo = state.promoCode.find(
        (p) => p.code === code
      );

      if (promo) {
        state.appliedPromo = promo;
        state.discountDone = true;
      } else {
        state.appliedPromo = null;
        state.discountDone = false;
      }

      recalcTotals(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseOne,
  decreaseOne,
  applyPromoCode,
  setCartFromStorage,
} = cartSlice.actions;

export default cartSlice.reducer;
