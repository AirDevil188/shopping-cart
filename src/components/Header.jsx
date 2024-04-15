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
    <header>
      <StyledNavbar>
        <StyledHeaderContainer>
          <h3 className="logo-text">eStore</h3>
        </StyledHeaderContainer>
        <div className="hamburger-container">
          <button onClick={handleHamburger} title="hamburger-button">
            <GiHamburgerMenu size={30} color="#fff"></GiHamburgerMenu>
          </button>

          {nav ? (
            <menu className="nav-menu">
              <li onClick={handleHamburger}>
                <NavLink to={"/"}>Home</NavLink>
              </li>
              <li onClick={handleHamburger}>
                <NavLink to={"/shop"}>Shop</NavLink>
              </li>
            </menu>
          ) : null}
        </div>

        <menu className="nav-menu-lg">
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li>
            <NavLink to={"/shop"}>Shop</NavLink>
          </li>
        </menu>
        <menu className="shopping-cart-menu">
          <NavLink to={"/shopping-cart"}>
            <button title="cart-button">
              <FaShoppingBasket size={30} color="#fff"></FaShoppingBasket>
              {cart > 0 ? <div className="cart-counter">{cart}</div> : null}
            </button>
          </NavLink>
        </menu>
      </StyledNavbar>
    </header>
  );
};

export default Header;

const StyledNavbar = styled.nav`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  background-color: #000;
  padding: 0.5rem;
  .nav-menu {
    display: flex;
    flex-flow: column wrap;
    list-style: none;
    gap: 15px;
    padding: 5px;
    background-color: #000;
    font-size: 1.5rem;
    text-align: center;
    text-transform: uppercase;
    order: 1;
  }

  button {
    background-color: #000;
    border: 1px solid #fff;
    cursor: pointer;
    margin: 1rem;
    padding: 1rem;
  }

  .shopping-cart-menu {
    order: 3;
  }

  a {
    text-decoration: none;
    color: #fff;
  }

  .nav-menu-lg {
    display: none;
    list-style: none;
    align-items: center;
    gap: 15px;
    padding: 5px;
    background-color: #000;
    font-size: 1.5rem;
    text-align: center;
    text-transform: uppercase;
  }

  .cart-counter {
    display: flex;
    align-items: center;
    position: absolute;
    background-color: red;
    right: 27px;
    top: 38px;
    padding: 3px;
    max-height: 9px;
    text-align: center;
    border-radius: 10px;
    color: #fff;
  }
  @media (min-width: 800px) {
    .hamburger-container {
      display: none;
    }

    .nav-menu-lg {
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      font-size: 2rem;
      order: 2;
    }
  }
`;

const StyledHeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: #000;
  color: #fff;
  align-items: center;
  font-size: 2rem;
  order: 2;
  align-self: flex-start;
  text-wrap: nowrap;
  margin-top: 1.2rem;

  @media (min-width: 800px) {
    order: 1;
    font-size: 3rem;
    align-self: center;
    margin: 0;
  }
`;
