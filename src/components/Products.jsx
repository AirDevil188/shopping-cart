import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { useLocation, useOutletContext } from "react-router-dom";
import PropTypes from "prop-types";

const Products = ({ data, handleIncrement, handleDecrement }) => {
  const location = useLocation();
  const [cart, setCart] = useOutletContext();

  return data.map((data) => {
    return (
      <figure id={data.id} key={data.id}>
        <picture>
          <img src={data.image} alt="" />
        </picture>
        <h4 className="data-name">{data.title}</h4>
        {location.pathname === "/shop" && (
          <ShopProducts
            data={data}
            handleAddToCart={clickToAddToCart}
            handleDecrement={handleDecrement}
            handleIncrement={handleIncrement}
          />
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

  function clickToAddToCart(e) {
    const id = Number(e.target.id);
    const itemQuantity = Number(e.target.value);
    const findSelectedElement = data.find((item) => item.id === id);
    const cartItem = cart.find((item) => item.id === id);

    if (!cartItem) {
      setCart((prevState) => [...prevState, findSelectedElement]);
    } else {
      setCart(
        cart.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + itemQuantity }
            : item
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

const ShopProducts = ({
  data,
  handleIncrement,
  handleDecrement,
  handleAddToCart,
}) => {
  return (
    <>
      <figcaption className="data-caption">{data.description}</figcaption>
      <div className="button-container">
        <CiCircleMinus onClick={handleDecrement} id={data.id} />
        <output>{data.quantity}</output>
        <CiCirclePlus onClick={handleIncrement} id={data.id} />
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
  return (
    <>
      <div className="button-container">
        <CiCircleMinus onClick={handleDecrement} id={data.id} />
        <output>{data.quantity}</output>
        <CiCirclePlus onClick={handleIncrement} id={data.id} />
        <div className="price-container">
          <output>Quantity: {data.quantity}</output>
          <output>Price: {data.price * data.quantity}</output>
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
  handleIncrement: PropTypes.func.isRequired,
  handleDecrement: PropTypes.func.isRequired,
};

CartProducts.propTypes = {
  data: PropTypes.object.isRequired,
  handleIncrement: PropTypes.func.isRequired,
  handleDecrement: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default Products;
