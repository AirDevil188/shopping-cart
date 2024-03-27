import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <h1>Shopping Cart</h1>
      <nav>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/shop"}>Shop</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
