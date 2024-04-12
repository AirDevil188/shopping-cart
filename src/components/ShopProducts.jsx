import { Link } from "react-router-dom";
import styled from "styled-components";

const ShopProducts = ({ data, handleAddToCart }) => {
  return data.map((data) => {
    return (
      <StyledFigureElement id={data.id} key={data.id}>
        <StyledImageCardContainer>
          <Link
            state={data}
            to={`/shop/products/${String(data.id)}`}
            title="prod-link"
            className="product-link-img"
          >
            <picture>
              <img src={data.image} alt="" />
            </picture>
          </Link>
        </StyledImageCardContainer>
        <StyledTitleContainer>
          <Link to={`/shop/products/${String(data.id)}`}>
            <h4 className="data-name">{data.title}</h4>
          </Link>
        </StyledTitleContainer>
        <StyledPriceContainer>
          <output>${data.price}</output>
        </StyledPriceContainer>
        <StyledCardContainer>
          <StyledAddToCartButton
            onClick={handleAddToCart}
            id={data.id}
            value={data.quantity}
            title="add-cart-btn"
          >
            Add To Cart
          </StyledAddToCartButton>
        </StyledCardContainer>
      </StyledFigureElement>
    );
  });
};

export default ShopProducts;

const StyledFigureElement = styled.figure`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-evenly;
  height: auto;
  max-width: 150px;
  text-align: center;
  gap: 15px;

  img {
    width: 100%;
  }
`;

const StyledCardContainer = styled.div``;

const StyledImageCardContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
`;

const StyledAddToCartButton = styled.div`
  background-color: #000;
  color: #fff;
  padding: 10px;
  text-transform: uppercase;
  cursor: pointer;
`;

const StyledTitleContainer = styled(StyledCardContainer)`
  font-size: 1.5rem;
  a {
    color: #000;
    text-decoration: none;
  }
`;

const StyledPriceContainer = styled(StyledCardContainer)`
  font-size: 1.1rem;
  font-weight: 900;
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
`;
