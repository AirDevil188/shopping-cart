import PropTypes, { func } from "prop-types";
import styled from "styled-components";
import ShopProducts from "./ShopProducts";
import { useOutletContext } from "react-router-dom";
import getData from "../helper/getData";
import ErrorPage from "../routes/ErrorPage";
import { useEffect, useState } from "react";

const Shop = ({
  handleAddToCart,
  handleCategoryChange,
  handleSearchChange,
}) => {
  const { data, loading, error } = getData("/products");
  const [products, setProducts] = useState([]);

  function handleCategoryChange(e) {
    const newCategoryValue = e.target.value;
    if (e.target.value === "all") setProducts(data);
    else setProducts(data.filter((item) => item.category === newCategoryValue));
  }

  function handleSearchChange(e) {
    const keyword = e.target.value;
    if (keyword == "") setProducts(data);
    else
      setProducts(
        data.filter((item) =>
          item.title.toLowerCase().includes(keyword.toLowerCase())
        )
      );
  }

  useEffect(() => {
    if (data && data.length > 0) setProducts(data);
  }, [data]);

  return (
    <section className="shop-section">
      <FilterSection
        handleCategoryChange={handleCategoryChange}
        handleSearchChange={handleSearchChange}
      />
      <StyledItemsContainer>
        <ProductSection
          handleAddToCart={handleAddToCart}
          data={products}
          error={error}
          loading={loading}
          products={products}
        ></ProductSection>
      </StyledItemsContainer>
    </section>
  );
};

const ProductSection = ({
  data,
  error,
  loading,
  products,
  handleAddToCart,
}) => {
  const [cart, setCart] = useOutletContext();
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
      {loading && <h3>Loading posts...</h3>}
      {error && <ErrorPage error={error} />}
      {products && (
        <ShopProducts
          data={data}
          handleAddToCart={handleAddToCart}
        ></ShopProducts>
      )}
    </>
  );
};

const FilterSection = ({ handleCategoryChange, handleSearchChange }) => {
  return (
    <StyledFilterSection>
      <div className="categories-filter">
        <label htmlFor="category-select">Choose a category:</label>

        <select
          name="catagories"
          id="category-select"
          onChange={handleCategoryChange}
        >
          <option value="all">All</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelry</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
        </select>
      </div>
      <div className="search-box">
        <input type="search" id="search-box" onChange={handleSearchChange} />
      </div>
    </StyledFilterSection>
  );
};

ShopProducts.propTypes = {
  data: PropTypes.array.isRequired,
  handleAddToCart: PropTypes.func.isRequired,
};

const StyledItemsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  justify-content: center;
  align-items: stretch;
  justify-items: center;
  gap: 20px;
  padding: 1rem;
`;

const StyledFilterSection = styled.section`
  display: flex;
  justify-content: center;
`;
export default Shop;
