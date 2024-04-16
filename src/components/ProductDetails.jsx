import { useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import getData from "../helper/getData";
import ErrorPage from "../routes/ErrorPage";
import styled from "styled-components";

const ProductDetails = () => {
  const { productID } = useParams();
  const { data, loading, error } = getData(`/products/${productID}`);

  const [cart, setCart] = useOutletContext();
  const [value, setValue] = useState("1");
  const reg = new RegExp("[1-9]");

  function handleAddToCart(e) {
    const id = Number(e.target.id);
    const cartItem = cart.find((item) => item.id === id);

    if (!cartItem) {
      setCart((prevState) => [
        ...prevState,
        data.find((item) => (item.quantity = Number(value))),
      ]);
    } else {
      setCart(
        cart.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + Number(value) }
            : item
        )
      );
    }
  }

  return (
    <>
      {loading && <h3>Loading posts...</h3>}
      {error && <ErrorPage error={error} />}
      {data &&
        data.map((data) => {
          return (
            <StyledProductSection key={data.id}>
              <figure key={data.id}>
                <div className="product-image">
                  <picture>
                    <img src={data.image} alt="" />
                  </picture>
                </div>
                <div className="product-title">
                  <h3>{data.title}</h3>
                </div>
                <div className="product-description">
                  <p title="prod-desc">{data.description}</p>
                </div>
                <div className="price-container">
                  <output>${data.price}</output>
                </div>
                <input
                  type="number"
                  id={data.id}
                  onChange={(event) => setValue(event.target.value)}
                  value={value}
                />
                <div className="buttons-container">
                  <button
                    onClick={handleAddToCart}
                    type="submit"
                    id={data.id}
                    disabled={!value.match(reg) ? true : false}
                  >
                    ADD TO CART
                  </button>
                </div>
              </figure>
            </StyledProductSection>
          );
        })}
    </>
  );
};

export default ProductDetails;

const StyledProductSection = styled.section`
  section {
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
  }

  figure {
    display: flex;
    flex-flow: column wrap;
    gap: 20px;
    align-items: center;
    padding: 1rem;
    text-align: center;
  }

  img {
    max-width: 300px;
  }

  output {
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      "Open Sans",
      "Helvetica Neue",
      sans-serif;
    font-size: 1.1rem;
    font-weight: 900;
  }

  button {
    background-color: #000;
    padding: 1rem;
    text-transform: uppercase;
    color: white;
    border: 1px solid white;
    cursor: pointer;
  }

  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  input {
    max-width: 50px;
  }
`;
