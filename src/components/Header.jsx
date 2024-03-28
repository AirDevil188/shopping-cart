import { NavLink } from "react-router-dom";

const Header = () => {
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
            <NavLink to={"/shopping-cart"}>Cart</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
