import { Link } from "react-router-dom";
import styled from "styled-components";

const CartProducts = ({
  data,
  handleIncrement,
  handleDecrement,
  handleDelete,
}) => {
  return data.map((data) => {
    const price = data.price * data.quantity;
    return (
      <StyledListElement id={data.id} key={data.id} title="li-item">
        <Link
          className="cart-img"
          state={data}
          to={`/shop/products/${String(data.id)}`}
        >
          <picture>
            <img src={data.image} alt="" />
          </picture>
          <StyledPriceContainer>
            <output>Price: ${price.toFixed(2)}</output>
          </StyledPriceContainer>
        </Link>
        <StyledTitleContainer>
          <Link state={data} to={`/shop/products/${String(data.id)}`}>
            <h4 className="data-name">{data.title}</h4>
          </Link>
        </StyledTitleContainer>
        <StyledElementContainer>
          <button id={data.id} onClick={handleDecrement}>
            -
          </button>
          <output title="quantity">{data.quantity}</output>
          <button id={data.id} onClick={handleIncrement}>
            +
          </button>
        </StyledElementContainer>
        <StyledElementContainer>
          <button className="delete-button" id={data.id} onClick={handleDelete}>
            DELETE
          </button>
        </StyledElementContainer>
      </StyledListElement>
    );
  });
};

const StyledListElement = styled.li`
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem;
  gap: 20px;
  text-align: center;

  img {
    max-width: 100px;
  }

  .cart-img {
    display: flex;
    flex-flow: column wrap;
    gap: 5px;
  }

  a {
    color: #000;
    text-decoration: none;
  }

  @media (min-width: 550px) {
    flex-direction: column;
    flex-flow: row nowrap;
    justify-content: space-between;
  }
`;

const StyledElementContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 5px;
  output {
    font-size: 1.5rem;
  }
  button {
    background: #000;
    color: #fff;
    text-align: center;
    text-transform: uppercase;
    border: 1px solid white;
    padding: 15px;
    font-size: 1rem;
    cursor: pointer;
  }
`;

const StyledPriceContainer = styled.div`
  output {
    font-weight: 900;
    text-align: center;
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
`;

const StyledTitleContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-content: center;
  justify-content: center;
  flex: 1;
`;
export default CartProducts;
