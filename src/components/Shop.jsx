const Shop = () => {
  return (
    <section id="shop-section">
      <div className="hero-text-container">
        <h2>Check out our awesome new items!</h2>
        <div className="items-container">
          <figure id="item-1">
            <picture>
              <img src="" alt="" />
            </picture>
            <h4 className="item-name"></h4>
            <figcaption className="item-caption"></figcaption>
            <div className="button-container">
              <input type="number" />
              <button className="btn-add-to-cart">Add To Cart</button>
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
};

export default Shop;
