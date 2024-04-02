import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import {
  localStorageGetData,
  localStorageSetData,
} from "./helper/localStorage";

const App = () => {
  const [cart, setCart] = useState(() => {
    return localStorageGetData("cart") || [];
  });

  useEffect(() => {
    localStorageSetData("cart", cart);
  }, [cart]);

  return (
    <>
      <Header cart={cart.length} />
      <Footer />
      <Outlet context={[cart, setCart]} />
    </>
  );
};

export default App;
