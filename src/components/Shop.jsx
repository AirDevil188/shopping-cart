import { useEffect, useState } from "react";
import Products from "./Products";
import { getRequestFetch } from "../helper/fetchData";

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
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getRequestFetch(
          "https://fakestoreapi.com/products?limit=5"
        );
        console.log(data);
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

  return (
    <>
      {loading && <p>Loading posts...</p>}
      {error && <p>{error}</p>}
      {data && <Products data={data} />}
    </>
  );
};

export default Shop;
