const Cart = () => {
  return (
    <section id="shopping-cart-section">
      <div>
        <h2>Your Cart (0 items)</h2>
        <div className="shopping-cart-items"></div>
        <div className="subtotal-container">
          <h3>Subtotal: </h3>
          <button className="checkout-button">Checkout</button>
        </div>
      </div>
    </section>
  );
};

export default Cart;
