import { createSlice } from '@reduxjs/toolkit';

// Helper function to update header basket count
const updateHeaderBasketCount = (products) => {
  if (typeof window !== 'undefined' && window.updateBasketCount) {
    const totalCount = products.reduce((sum, item) => sum + item.count, 0);
    window.updateBasketCount(totalCount);
  }
};

// Initial state for the cart
const initialState = {
  products: typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("cartProducts")) || []
    : [],
  num: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add product to cart
    addProduct: (state, action) => {
      const product = action.payload;
      const existingProduct = state.products.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.count += 1;
        alert("تعداد محصول در سبد خرید افزایش یافت!");
      } else {
        state.products.push({ ...product, count: 1 });
        alert("محصول به سبد خرید افزوده شد!");
      }
      localStorage.setItem("cartProducts", JSON.stringify(state.products));
      
      // Update header basket count
      updateHeaderBasketCount(state.products);
    },
    // Increase product count
    plusFromCart: (state, action) => {
      const pId = action.payload;
      const product = state.products.find(item => item.id === pId);
      if (product) {
        product.count += 1;
        localStorage.setItem("cartProducts", JSON.stringify(state.products));
        
        // Update header basket count
        updateHeaderBasketCount(state.products);
      }
    },
    // Decrease product count
    minusFromCart: (state, action) => {
      const pId = action.payload;
      const product = state.products.find(item => item.id === pId);
      if (product) {
        product.count -= 1;
        if (product.count <= 0) {
          state.products = state.products.filter(item => item.id !== pId);
        }
        localStorage.setItem("cartProducts", JSON.stringify(state.products));
        
        // Update header basket count
        updateHeaderBasketCount(state.products);
      }
    },
    // Calculate total price
    totalPrice: (state) => {
      state.num = state.products.reduce((sum, item) => sum + item.price * item.count, 0);
    },
    // Clear cart
    clearCart: (state) => {
      state.products = [];
      localStorage.removeItem("cartProducts");
      
      // Update header basket count to 0
      if (typeof window !== 'undefined' && window.updateBasketCount) {
        window.updateBasketCount(0);
      }
    },
    // Set products (for hydration or after order)
    setProducts: (state, action) => {
      state.products = action.payload;
      
      // Update header basket count
      updateHeaderBasketCount(state.products);
    },
  },
});

export const {
  addProduct,
  plusFromCart,
  minusFromCart,
  totalPrice,
  clearCart,
  setProducts,
} = cartSlice.actions;

export default cartSlice.reducer; 