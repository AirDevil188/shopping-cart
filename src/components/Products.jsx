import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { Link, useLocation, useOutletContext } from "react-router-dom";
import PropTypes from "prop-types";

const Products = ({ data, handleIncrement, handleDecrement }) => {
  const location = useLocation();
  const [cart, setCart] = useOutletContext();

  return data.map((data) => {
    return (
      <figure id={data.id} key={data.id}>
        <Link state={data} to={`/shop/products/${String(data.id)}`}>
          <picture>
            <img src={data.image} alt="" />
          </picture>
          <h4 className="data-name">{data.title}</h4>
        </Link>
        {location.pathname === "/shop" && (
          <ShopProducts data={data} handleAddToCart={handleAddToCart} />
        )}
        {location.pathname === "/shopping-cart" && (
          <CartProducts
            data={data}
            handleDecrement={handleDecrement}
            handleIncrement={handleIncrement}
            handleDelete={handleDelete}
          />
        )}
      </figure>
    );
  });

  function handleAddToCart(e) {
    const id = Number(e.target.id);
    const findSelectedElement = data.find((item) => item.id === id);
    const cartItem = cart.find((item) => item.id === id);

    if (!cartItem) {
      setCart((prevState) => [...prevState, findSelectedElement]);
    } else {
      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    }
  }

  function handleDelete(e) {
    const id = Number(e.target.id);
    const deleteItem = cart.filter((item) => item.id !== id);
    setCart(deleteItem);
  }
};

const ShopProducts = ({ data, handleAddToCart }) => {
  return (
    <>
      <div className="price-container">
        <output>${data.price}</output>
      </div>
      <div className="button-container">
        <button
          className="btn-add-to-cart"
          onClick={handleAddToCart}
          id={data.id}
          value={data.quantity}
        >
          Add To Cart
        </button>
      </div>
    </>
  );
};

const CartProducts = ({
  data,
  handleIncrement,
  handleDecrement,
  handleDelete,
}) => {
  const price = data.price * data.quantity;
  return (
    <>
      <div className="button-container">
        <CiCircleMinus onClick={handleDecrement} id={data.id} />
        <output>{data.quantity}</output>
        <CiCirclePlus onClick={handleIncrement} id={data.id} />
        <div className="price-container">
          <output>Price: ${price.toFixed(2)}</output>
        </div>
        <button className="delete-button" id={data.id} onClick={handleDelete}>
          DELETE
        </button>
      </div>
    </>
  );
};

ShopProducts.propTypes = {
  data: PropTypes.object.isRequired,
  handleAddToCart: PropTypes.func.isRequired,
};

CartProducts.propTypes = {
  data: PropTypes.object.isRequired,
  handleIncrement: PropTypes.func.isRequired,
  handleDecrement: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default Products;
