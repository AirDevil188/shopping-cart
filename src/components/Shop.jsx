import PropTypes, { func } from "prop-types";
import ShopProducts from "./ShopProducts";
import { useOutletContext } from "react-router-dom";
import getData from "../helper/getData";
import ErrorPage from "../routes/ErrorPage";
import { useEffect, useState } from "react";
import FilterSection from "./FIlterSection";

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
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) setProducts(data);
  }, [data]);

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

  function handleCategoryChange(e) {
    const newCategoryValue = e.target.value;
    console.log(newCategoryValue);
    console.log(data);
    if (e.target.value === "all") setProducts(data);
    else setProducts(data.filter((item) => item.category === newCategoryValue));
  }

  function handleSearchChange(e) {
    const keyword = e.target.value;

    console.log(keyword);
    if (keyword == "") setProducts(data);
    else
      setProducts(
        data.filter((item) => item.title.toLowerCase().includes(keyword))
      );
  }
  return (
    <>
      <FilterSection
        handleCategoryChange={handleCategoryChange}
        handleSearchChange={handleSearchChange}
      />
      {loading && <h3>Loading posts...</h3>}
      {error && <ErrorPage error={error} />}
      {products && (
        <ShopProducts
          data={products}
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
