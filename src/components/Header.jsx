import { NavLink, Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaShoppingBasket } from "react-icons/fa";
import { useState } from "react";

const Header = ({ cart }) => {
  const [nav, setNav] = useState(false);

  const handleHamburger = () => {
    setNav(!nav);
  };

  return (
    <StyledHeader>
      <StyledNavbar>
        <StyledDefaultButton title="hamburger-button" onClick={handleHamburger}>
          <GiHamburgerMenu color="#fff" />
        </StyledDefaultButton>
        <Link
          to={"/"}
          onClick={(prevState) => setNav(prevState ? !prevState : !prevState)}
        >
          <h1>eStore</h1>
        </Link>
        <NavLink to={"/shopping-cart"}>
          <StyledDefaultButton
            title="cart-button"
            onClick={(prevState) => setNav(prevState ? !prevState : !prevState)}
          >
            <FaShoppingBasket color="#fff" />
          </StyledDefaultButton>
        </NavLink>
      </StyledNavbar>
      <StyledMenuNavBar>
        {nav ? (
          <StyledUL>
            <StyledLinks onClick={handleHamburger}>
              <NavLink to={"/"}>Home</NavLink>
            </StyledLinks>
            <StyledLinks onClick={handleHamburger}>
              <NavLink to={"/shop"}>Shop</NavLink>
            </StyledLinks>
          </StyledUL>
        ) : null}
      </StyledMenuNavBar>
    </StyledHeader>
  );
};

/// styled-components

const StyledHeader = styled.header`
  h1 {
    font-size: 3rem;
    color: #fff;
  }
`;

const StyledDefaultButton = styled.button`
  cursor: pointer;
  margin: 1rem;
  padding: 1rem;
  background: #000;
  border: 1px solid #fff;
`;

const StyledLinks = styled.li`
  a {
    text-decoration: none;
    color: #fff;
  }
`;

const StyledUL = styled.ul`
  display: flex;
  flex-flow: column wrap;
  list-style: none;
  gap: 15px;
  margin: 0;
  padding: 0;
  background-color: #000;
  font-size: 2.5rem;
  text-align: center;
`;

const StyledNavbar = styled.nav`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  font-weight: 500;
  font-size: 3rem;
  background-color: #000;

  a {
    text-decoration: none;
  }
`;

const StyledMenuNavBar = styled.nav`
  display: flex;
  align-content: center;
  flex-flow: column wrap;
  background-color: #000;
`;
export default Header;
