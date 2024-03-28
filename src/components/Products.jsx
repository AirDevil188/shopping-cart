const Products = ({ data }) => {
  return data.map((item) => {
    return (
      <figure id={item.id} key={item.id}>
        <picture>
          <img src={item.image} alt="" />
        </picture>
        <h4 className="item-name">{item.title}</h4>
        <figcaption className="item-caption">{item.description}</figcaption>
        <div className="button-container">
          <input type="number" />
          <button className="btn-add-to-cart">Add To Cart</button>
        </div>
      </figure>
    );
  });
};
export default Products;
