import { useState } from "react";
import { useLocation, useOutletContext } from "react-router-dom";

const ProductDetails = () => {
  const { state } = useLocation();
  const [cart, setCart] = useOutletContext();
  const [value, setValue] = useState(1);
  console.log(typeof value);

  function handleAddToCart(e) {
    const id = Number(e.target.id);
    const cartItem = cart.find((item) => item.id === id);
    console.log(cartItem);

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
    <section className="product-section" id={state.id}>
      <div className="product-title">
        <h3>{state.title}</h3>
      </div>
      <div className="product-image">
        <picture>
          <img src={state.image} alt="" />
        </picture>
      </div>
      <div className="product-description">
        <p>{state.description}</p>
      </div>
      <div className="price-container">
        <output>{state.price}</output>
      </div>
      <div className="buttons-container">
        <input
          type="number"
          id={state.id}
          onChange={(event) => setValue(Number(event.target.value))}
          min={1}
        />
        <button onClick={handleAddToCart} type="submit" id={state.id}>
          ADD TO CART
        </button>
      </div>
    </section>
  );
};

export default ProductDetails;
