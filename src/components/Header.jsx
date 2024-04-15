import { NavLink, Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

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
          <NavLink to={"/"}>
            <h3 className="logo-text">eStore</h3>
          </NavLink>
        </StyledHeaderContainer>
        <div className="hamburger-menu-container" onClick={handleHamburger}>
          <button title="hamburger-button">
            {nav ? (
              <IoClose size={30} color="#fff"></IoClose>
            ) : (
              <GiHamburgerMenu size={30} color="#fff"></GiHamburgerMenu>
            )}
          </button>
        </div>
        <div className="hamburger-container">
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

const ExpandAnimation = keyframes`
    
  0% {
    transform: scaleY(0);
  }

  70% {
    transform: scaleY(1.1);
  }
  
  100% {
    transform: scaleY(1);
  }
`;

const StyledNavbar = styled.nav`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background-color: #000;
  padding: 0.5rem;
  .nav-menu {
    display: flex;
    flex-flow: column wrap;
    list-style: none;
    gap: 15px;
    padding: 5px;
    background-color: #000;
    font-size: 2rem;
    text-align: center;
    text-transform: uppercase;
    animation: ${ExpandAnimation} 500ms ease-in-out;
    transform-origin: top;
  }

  .hamburger-container {
    grid-column: 1/4;
    grid-row: 2/3;
  }

  button {
    background-color: #000;
    border: 1px solid #fff;
    cursor: pointer;
    margin: 1rem;
    padding: 1rem;
  }

  .shopping-cart-menu {
    grid-column: 3/3;
    display: flex;
    justify-content: flex-end;
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

    .hamburger-menu-container {
      display: none;
    }

    .nav-menu-lg {
      display: flex;
      justify-content: center;
      grid-column: 2/3;
      grid-row: 1/2;
      font-size: 2rem;
    }
  }
`;

const StyledHeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  grid-column: 2/3;
  grid-row: 1/2;
  background-color: #000;
  color: #fff;
  font-size: 2rem;
  align-self: center;
  text-wrap: nowrap;

  @media (min-width: 800px) {
    font-size: 3rem;
    padding: 1rem;
    align-self: center;
    justify-content: flex-start;
    margin: 0;
    grid-column: 1/2;
    grid-row: 1/2;
  }
`;
