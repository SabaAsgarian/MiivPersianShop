import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

// The Redux store holds the state of your whole app.
// Here, we combine all reducers (just cart for now).
const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store; 