import React from "react";
import PriceCalc from "./price-calc/price-calc";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <PriceCalc />
    </Provider>
  );
}

export default App;
