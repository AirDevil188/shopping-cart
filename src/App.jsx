import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState } from "react";

const App = () => {
  const [cart, setCart] = useState([]);
  return (
    <>
      <Header cart={cart.length} />
      <Footer />
      <Outlet context={[cart, setCart]} />
    </>
  );
};

export default App;
