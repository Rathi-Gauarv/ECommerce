import React, { useContext } from "react";
import "../Styles/SingleProduct.css";
import { AllProducts, CartAllProducts, ModalContext } from "../Routers";
import Swal from "sweetalert2";


const SingleProduct = ({ item }) => {
  const modalContextValueForCart = useContext(ModalContext)
  const cartProductsContext = useContext(CartAllProducts);
  const allProductsContext = useContext(AllProducts)

  // --------------------------Add to cart btn-------------------------
  const handleAddToCart = () => {
    const admin = localStorage.getItem("admin")
    const login = localStorage.getItem("login")

    if(admin || login){
      if (cartProductsContext.cartProducts.some(el => el.id == item.id)) {
        const index = cartProductsContext.cartProducts?.findIndex(el => el.id == item.id);
        const productIndex = allProductsContext.products.findIndex(el => el.id == item.id);
        
        cartProductsContext.cartProducts[index].quantity += allProductsContext.products[productIndex].quantity;
        cartProductsContext.cartProducts[index].total = +(
          cartProductsContext.cartProducts[index].price *
          cartProductsContext.cartProducts[index].quantity
        );
      } else {
        cartProductsContext.setCartProducts((prev) => [...prev, { ...item }]);
      }
      Swal.fire(`${item.product_Name} successfully added into your cart`)
    }else{
      modalContextValueForCart?.setShowModal("login");
    }
  };


  return (
    <div className="product_container">
      <div className="image_container">
        <img className="product_image" src={item.product_Image} alt="img" />
      </div>
      <div className="productDetails_container">
        <h3>{item.product_Name}</h3>
        <p>{item.product_Desc}</p>
        <div className="price_cart_btn_container">
          <span>₹ {item.price}</span>
          <span>{item.quantity}</span>
          <button
            className=" btn cart_btn "
            style={{ background: "#576CBC", color: "white" }}
            onClick={handleAddToCart}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
