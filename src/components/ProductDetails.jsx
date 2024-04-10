import { useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import getData from "../helper/getData";
import ErrorPage from "../routes/ErrorPage";

const ProductDetails = () => {
  const { productID } = useParams();
  const { data, loading, error } = getData(`/products/${productID}`);

  const [cart, setCart] = useOutletContext();
  const [value, setValue] = useState(1);

  function handleAddToCart(e) {
    const id = Number(e.target.id);
    const cartItem = cart.find((item) => item.id === id);

    if (!cartItem) {
      const newObj = Object.assign({}, state);
      newObj.quantity = value;
      setCart((prevState) => [...prevState, newObj]);
    } else {
      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + value } : item
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
            <section className="product-section" key={data.id}>
              <figure key={data.id}>
                <div className="product-title">
                  <h3>{data.title}</h3>
                </div>
                <div className="product-image">
                  <picture>
                    <img src={data.image} alt="" />
                  </picture>
                </div>
                <div className="product-description">
                  <p title="prod-desc">{data.description}</p>
                </div>
                <div className="price-container">
                  <output>{data.price}</output>
                </div>
                <div className="buttons-container">
                  <input
                    type="number"
                    id={data.id}
                    onChange={(event) => setValue(Number(event.target.value))}
                    min={1}
                  />
                  <button onClick={handleAddToCart} type="submit" id={data.id}>
                    ADD TO CART
                  </button>
                </div>
              </figure>
            </section>
          );
        })}
    </>
  );
};

export default ProductDetails;
