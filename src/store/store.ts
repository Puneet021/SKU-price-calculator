import { configureStore } from "@reduxjs/toolkit";
import priceCalcSlice from "./price-calc/priceCalcSlice";

const store = configureStore({
  reducer: {
    priceCalc: priceCalcSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// In your store file (e.g., store.ts)
export type AppDispatch = typeof store.dispatch;

export default store;
