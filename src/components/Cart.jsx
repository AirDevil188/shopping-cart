import { useOutletContext } from "react-router-dom";
import CartProducts from "./CartProducts";
import PropTypes from "prop-types";

const Cart = () => {
  const [cart, setCart] = useOutletContext();
  const subtotal = cart.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.quantity * currentValue.price;
  }, 0);

  function handleClickIncrement(e) {
    const id = Number(e.target.id);

    const products = cart.map((item) => {
      if (id === item.id) {
        return { ...item, quantity: item.quantity + 1 };
      } else return item;
    });
    setCart(() => products);
  }

  function handleClickDecrement(e) {
    const id = Number(e.target.id);

    const products = cart.map((item) => {
      if (id === item.id && item.quantity !== 1) {
        return { ...item, quantity: item.quantity - 1 };
      } else return item;
    });
    setCart(() => products);
  }

  function handleDelete(e) {
    const id = Number(e.target.id);
    const deleteItem = cart.filter((item) => item.id !== id);
    setCart(deleteItem);
  }

  return (
    <section id="shopping-cart-section">
      <div>
        <h2>Your Cart: {cart.length}</h2>
        <div className="shopping-cart-items">
          {cart.length === 0 && <h3>Cart is empty</h3>}
          {cart.length !== 0 && (
            <CartProducts
              data={cart}
              handleDecrement={handleClickDecrement}
              handleIncrement={handleClickIncrement}
              handleDelete={handleDelete}
            />
          )}
        </div>
        <div className="subtotal-container">
          <h3>${subtotal.toFixed(2)}</h3>
          <button className="checkout-button">Checkout</button>
        </div>
      </div>
    </section>
  );
};

CartProducts.propTypes = {
  data: PropTypes.array.isRequired,
};
export default Cart;
