import { Link } from "react-router-dom";

const CartProducts = ({
  data,
  handleIncrement,
  handleDecrement,
  handleDelete,
}) => {
  return data.map((data) => {
    const price = data.price * data.quantity;
    return (
      <figure id={data.id} key={data.id}>
        <Link state={data} to={`/shop/products/${String(data.id)}`}>
          <picture>
            <img src={data.image} alt="" />
          </picture>
          <h4 className="data-name">{data.title}</h4>
        </Link>
        <div className="button-container">
          <button id={data.id} onClick={handleDecrement}>
            -
          </button>
          <output title="quantity">{data.quantity}</output>
          <button id={data.id} onClick={handleIncrement}>
            +
          </button>
          <div className="price-container">
            <output>Price: ${price.toFixed(2)}</output>
          </div>
          <button className="delete-button" id={data.id} onClick={handleDelete}>
            DELETE
          </button>
        </div>
      </figure>
    );
  });
};

export default CartProducts;
