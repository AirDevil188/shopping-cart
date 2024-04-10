import { Link } from "react-router-dom";

const ShopProducts = ({ data, handleAddToCart }) => {
  return data.map((data) => {
    return (
      <figure id={data.id} key={data.id}>
        <Link
          state={data}
          to={`/shop/products/${String(data.id)}`}
          title="prod-link"
        >
          <picture>
            <img src={data.image} alt="" />
          </picture>
          <h4 className="data-name">{data.title}</h4>
        </Link>
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
      </figure>
    );
  });
};

export default ShopProducts;
