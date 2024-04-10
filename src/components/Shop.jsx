import PropTypes from "prop-types";
import ShopProducts from "./ShopProducts";
import { useOutletContext } from "react-router-dom";
import getData from "../helper/getData";

const Shop = () => {
  return (
    <section id="shop-section">
      <div className="hero-text-container">
        <h2>Check out our awesome new items!</h2>
      </div>
      <div className="items-container">
        <ProductSection />
      </div>
    </section>
  );
};

const ProductSection = () => {
  const [cart, setCart] = useOutletContext();
  const { data, loading, error } = getData("/products");

  function handleAddToCart(e) {
    const id = Number(e.target.id);
    const findSelectedElement = data.find((item) => item.id === id);
    const cartItem = cart.find((item) => item.id === id);

    if (!cartItem) {
      setCart((prevState) => [...prevState, findSelectedElement]);
    } else {
      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    }
  }
  return (
    <>
      {loading && <p>Loading posts...</p>}
      {error && <p>{error}</p>}
      {data && (
        <ShopProducts
          data={data}
          handleAddToCart={handleAddToCart}
        ></ShopProducts>
      )}
    </>
  );
};

ShopProducts.propTypes = {
  data: PropTypes.array.isRequired,
  handleAddToCart: PropTypes.func.isRequired,
};

export default Shop;
