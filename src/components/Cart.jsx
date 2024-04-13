import { useOutletContext } from "react-router-dom";
import CartProducts from "./CartProducts";
import PropTypes from "prop-types";
import styled from "styled-components";

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
    <StyledShoppingCartSection>
      {cart.length === 0 && (
        <StyledEmptyContainer>
          <h3>Cart is empty</h3>
        </StyledEmptyContainer>
      )}
      {cart.length !== 0 && (
        <>
          <StyledCheckoutContainer>
            <h3>Summary</h3>
            <ul>
              <li>
                Subtotal: <output>${subtotal.toFixed(2)}</output>
              </li>
              <li>
                Free Shipping: <output>$0.00</output>
              </li>
              <li>
                Total : <output>${subtotal.toFixed(2)}</output>
              </li>
            </ul>
            <h3></h3>
            <button className="checkout-button">Checkout</button>
          </StyledCheckoutContainer>
          <StyledShoppingCartUL>
            <h2>Your Cart: {cart.length}</h2>
            <CartProducts
              data={cart}
              handleDecrement={handleClickDecrement}
              handleIncrement={handleClickIncrement}
              handleDelete={handleDelete}
            />
          </StyledShoppingCartUL>
        </>
      )}
    </StyledShoppingCartSection>
  );
};

const StyledEmptyContainer = styled.section`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  padding: 3rem;
  flex: 1;
  font-size: 2rem;
  align-items: center;
`;

const StyledShoppingCartSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;

  @media (min-width: 800px) {
    flex-flow: row-reverse;
    gap: 5rem;
  }
`;

const StyledShoppingCartUL = styled.ul`
  display: flex;
  flex-flow: column wrap;
  gap: 20px;

  @media (min-width: 800px) {
    min-width: 60%;
    padding: 2rem;
  }
`;

const StyledCheckoutContainer = styled.div`
  display: flex;
  gap: 10px;
  padding: 1rem;
  font-size: 1.2rem;
  flex-flow: column wrap;
  align-items: stretch;

  ul {
    display: flex;
    flex-flow: column wrap;
    gap: 15px;
    list-style: none;
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
  }

  button {
    background-color: #000;
    color: #fff;
    border: 1px solid white;
    padding: 1rem;
    cursor: pointer;
  }
`;

CartProducts.propTypes = {
  data: PropTypes.array.isRequired,
};
export default Cart;
