import React, { useContext, useState } from "react";
import "../Styles/CartProduct.css";
import { AllProducts, CartAllProducts } from "../Routers";

const CartProduct = ({ cartItem, handleTotal }) => {
  const cartProductsContext = useContext(CartAllProducts);
  const allProductContext = useContext(AllProducts);
  const [quantity, setQuantity] = useState(false);



  // ------------------------Delete Btn---------------------------
  const handleDelete = id => {
    const index = cartProductsContext.cartProducts.findIndex( el => el.id == id);
    const productIndex = allProductContext.products.findIndex( el => el.id == id);

    cartProductsContext.cartProducts[index].quantity = +(allProductContext.products[productIndex].quantity);
    cartProductsContext.cartProducts[index].total = +cartItem.price;
    cartProductsContext.cartProducts.splice(index, 1);
    cartProductsContext.setCount(!cartProductsContext.count);

    handleTotal();
    updateCart()
    
  };


  // ------------------------------Product Quantity----------------------------
  const handleQuantity = e => {

    const index = cartProductsContext.cartProducts.findIndex( el => el.id == cartItem.id);

    if (e.target.className === "inc_sign") {
      cartProductsContext.cartProducts[index].quantity += 1;
    } else {
      if (cartProductsContext.cartProducts[index].quantity > 1) {
        cartProductsContext.cartProducts[index].quantity -= 1;
      }
    }
    cartProductsContext.cartProducts[index].total = +(
      cartProductsContext.cartProducts[index].quantity *
      cartProductsContext.cartProducts[index].price
    );
    setQuantity(!quantity);
    handleTotal();
    updateCart()
    
  };

  // -------------------------------update cart--------------------------
  function updateCart (){
  const cartList = JSON.parse(localStorage.getItem("cartList"))

    const userCartObj = cartList?.find((item)=>item.userEmail == cartProductsContext?.loginCredential?.email)
    userCartObj["cartItems"] = cartProductsContext.cartProducts
    const cartindex = cartList?.findIndex( (item)=>item.userEmail == cartProductsContext?.loginCredential?.email );
    cartList.splice(cartindex, 1)
    cartList.push(userCartObj)
    localStorage.setItem("cartList", JSON.stringify(cartList))
  }
  
  return (
    <div className="item_container">
      <div className="item_image_container">
        <img className="itemImage" src={cartItem.product_Image} alt="item" />
      </div>
      <div className="item_details_container">
        <div className="item_n_d_container">
          <div className="item_name">{cartItem.product_Name}</div>
          <div className="item_description">{cartItem.product_Desc}</div>
          <div className="item_price">₹ {cartItem.price}</div>
        </div>

        <div className="item_quantity">
          <span className="dec_sign" onClick={handleQuantity}>
            -
          </span>
          <input
            type="text"
            value={cartItem.quantity}
            className="quantity_input"
            readOnly
          />
          <span className="inc_sign" onClick={handleQuantity}>
            +
          </span>
        </div>

        <div className="delete_btn">
          <i
            className="fa-sharp fa-solid fa-trash"
            style={{ color: "#ff0000" }}
            onClick={() => handleDelete(cartItem.id)}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
