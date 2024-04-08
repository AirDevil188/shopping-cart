import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const Header = ({ cart }) => {
  return (
    <header>
      <h1>Shopping Cart</h1>
      <nav>
        <ul>
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li>
            <NavLink to={"/shop"}>Shop</NavLink>
          </li>
          <li>
            <NavLink to={"/shopping-cart"}>Cart ({cart})</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

Header.propTypes = {
  cart: PropTypes.number.isRequired,
};
export default Header;
