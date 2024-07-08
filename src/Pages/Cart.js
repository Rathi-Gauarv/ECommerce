import React, { Fragment, useContext, useState } from "react";
import "../Styles/Cart.css";
import CartProduct from "../Components/CartProduct";
import { CartAllProducts } from "../Routers";

const Cart = () => {
  const cartProducts = useContext(CartAllProducts).cartProducts;
  const [gotTotal, setGotTotal] = useState(false);

  let total = 0;
  cartProducts.map(item => (total += +(item.total)));

  const handleTotal = () => setGotTotal(!gotTotal);
  

  return (
    <div className="cart_container">
      <div className="cart_products_container">
        {cartProducts.length > 0 ? (
          cartProducts.map((cartItem) => {
            return (
              <Fragment key={cartItem.id}>
                <CartProduct cartItem={cartItem} handleTotal={handleTotal} />
              </Fragment>
            );
          })
        ) : (
          <div className="empty_cart_container">
            <h2>Empty Cart</h2>
          </div>
        )}
      </div>
      <div className="totalPrice_container">
        <span>Total</span>
        <span>{total}</span>
      </div>
    </div>
  );
};

export default Cart;
