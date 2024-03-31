import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";

const Products = ({
  data,
  handleAddToCart,
  handleIncrement,
  handleDecrement,
}) => {
  return data.map((item) => {
    return (
      <figure id={item.id} key={item.id}>
        <picture>
          <img src={item.image} alt="" />
        </picture>
        <h4 className="item-name">{item.title}</h4>
        <figcaption className="item-caption">{item.description}</figcaption>
        <div className="button-container">
          <CiCircleMinus onClick={handleDecrement} id={item.id} />
          <output>{item.quantity}</output>
          <CiCirclePlus onClick={handleIncrement} id={item.id} />
          <button
            className="btn-add-to-cart"
            onClick={handleAddToCart}
            id={item.id}
            value={item.quantity}
          >
            Add To Cart
          </button>
        </div>
      </figure>
    );
  });
};
export default Products;
