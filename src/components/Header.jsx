import { NavLink, Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaShoppingBasket } from "react-icons/fa";
import { useState, useEffect } from "react";

const Header = ({ cart }) => {
  const [nav, setNav] = useState(false);
  const location = useLocation();

  const handleHamburger = () => {
    setNav(!nav);
  };

  useEffect(() => {
    setNav((prevState) => (prevState ? !prevState : prevState));
  }, [location.pathname]);

  return (
    <StyledHeader>
      <StyledNavbar>
        <StyledDefaultButton title="hamburger-button" onClick={handleHamburger}>
          <GiHamburgerMenu color="#fff" size={20} />
        </StyledDefaultButton>
        <Link to={"/"}>
          <h1>eStore</h1>
        </Link>
        <NavLink to={"/shopping-cart"}>
          <StyledDefaultButton title="cart-button">
            <FaShoppingBasket color="#fff" size={20} />
            {cart > 0 ? <StyledCartCounter>{cart}</StyledCartCounter> : null}
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

const StyledCartCounter = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  background-color: red;
  right: 21px;
  top: 48px;
  padding: 3px;
  max-height: 9px;
  text-align: center;
  border-radius: 10px;
  color: #fff;
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
