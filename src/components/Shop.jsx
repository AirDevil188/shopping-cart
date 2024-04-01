import { useEffect, useState } from "react";
import Products from "./Products";
import { getRequestFetch } from "../helper/fetchData";

const Shop = () => {
  return (
    <section id="shop-section">
      <div className="hero-text-container">
        <h2>Check out our awesome new items!</h2>
        <div className="items-container">
          <ProductSection />
        </div>
      </div>
    </section>
  );
};

const ProductSection = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  function handleClickIncrement(e) {
    const id = Number(e.target.id);

    const products = data.map((item) => {
      if (id === item.id) {
        return { ...item, quantity: item.quantity + 1 };
      } else return item;
    });
    setData(products);
  }

  function handleClickDecrement(e) {
    const id = Number(e.target.id);

    const products = data.map((item) => {
      if (id === item.id && item.quantity !== 1) {
        return { ...item, quantity: item.quantity - 1 };
      } else return item;
    });
    setData(products);
  }

  return (
    <>
      {loading && <p>Loading posts...</p>}
      {error && <p>{error}</p>}
      {data && (
        <Products
          data={data}
          handleDecrement={handleClickDecrement}
          handleIncrement={handleClickIncrement}
        />
      )}
    </>
  );
};

export default Shop;
