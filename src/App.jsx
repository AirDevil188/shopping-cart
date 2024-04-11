import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import {
  localStorageGetData,
  localStorageSetData,
} from "./helper/localStorage";
import { createGlobalStyle } from "styled-components";

const App = () => {
  const [cart, setCart] = useState(() => {
    return localStorageGetData("cart") || [];
  });

  useEffect(() => {
    localStorageSetData("cart", cart);
  }, [cart]);

  return (
    <>
      <GlobalStyle />
      <Header cart={cart.length} />
      <Outlet context={[cart, setCart]} />
      <Footer />
    </>
  );
};

const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  padding: 0;
  font-family: "Italiana", sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;;

}

#root {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}
`;

export default App;
