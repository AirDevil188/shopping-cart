import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getRequestFetch } from "../helper/fetchData";
import ShopProducts from "./ShopProducts";
import { useOutletContext } from "react-router-dom";

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
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getRequestFetch(
          "https://fakestoreapi.com/products?limit=5"
        );
        const productWithQuantity = data.map((item) => {
          return { ...item, quantity: 1 };
        });
        setData(productWithQuantity);
        console.log(productWithQuantity);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

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
