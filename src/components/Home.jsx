import styled from "styled-components";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <StyledMainSection>
        <StyledHeroContainer>
          <StyledH1>Fresh prices, the right place to buy everything!</StyledH1>
          <Link to={"/shop"}>
            <StyledShopNowButton>Shop Now</StyledShopNowButton>
          </Link>
        </StyledHeroContainer>
      </StyledMainSection>
    </>
  );
};

export default HomePage;

//styled-components

const StyledMainSection = styled.main`
  display: flex;
  flex: 1;
  flex-flow: column wrap;
`;

const StyledHeroContainer = styled.section`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  background-image: url("../public/assets/img/hero-image.webp");
  padding: 10em 0 10em 0;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  font-family: "Rubik Mono One", monospace;
  color: #fff;
`;

const StyledH1 = styled.h1`
  font-size: 2em;
  text-align: center;
  text-shadow: rgba(57, 57, 57, 0.718) 2px 2px 4px;
  -webkit-text-stroke: 1px black;
`;

const StyledShopNowButton = styled.button`
  text-transform: uppercase;
  background-color: #000;
  color: #fff;
  cursor: pointer;
  border: none;
  padding: 1rem;
  margin: 0;
  border-radius: 10px;
`;
