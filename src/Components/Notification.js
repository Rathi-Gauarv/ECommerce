import React, { useContext, useState } from "react";
import "../Styles/Notification.css";
import { useNavigate } from "react-router-dom";
import { AllProducts, CartAllProducts, ModalContext } from "../Routers";
import Modal from "./Modal";
import UserProfileCard from "./UserProfileCard";

const Notification = () => {


  const cartAllProductsContext = useContext(CartAllProducts);
  const modalContextValue = useContext(ModalContext);
  const showPopupValue = modalContextValue.showModal;
  const [showUserProfile, setShowUserProfile] = useState(false)

  const navigate = useNavigate();
  const login = JSON.parse(localStorage.getItem("login"));

  // -----------------------cart icon------------------------
  const handleCart = () => navigate("/cart");

 

  // ----------------------login-------------------------
  const handleLoginPopup = () => {
    modalContextValue?.setShowModal("login");
  };

  // ------------------------Register-----------------------
  // const handleRegisterPopup = () => {
  //   modalContextValue?.setShowModal("register");
  // };

  const handleUserProfileCard = ()=>{
    setShowUserProfile(!showUserProfile)
  }

  return (
    <div>
      <div className="notification_container">
        <h1 className="heading">Own Shop</h1>
        <span className="cart_icon_login_container">
        <span className="profile_icon_card_container mx-2">
        <i
        className="fa-solid fa-user"
        style={{ color: "white", cursor: "pointer" }}
        onClick={handleUserProfileCard}
      >
      </i>
        {
          showUserProfile && 
          <UserProfileCard setShowUserProfile={setShowUserProfile} />
        }
        </span>
         
          {!login && (
            <span>
              <span className="login_text ms-3" onClick={handleLoginPopup}>
                Login
              </span>
              {/* <span className="login_text" onClick={handleRegisterPopup}>
                Register
              </span>*/}
            </span>
          )}
          <i
            className="fa-sharp fa-solid fa-cart-shopping ms-2"
            style={{ color: "white", cursor: "pointer" }}
            onClick={handleCart}
          ></i>
          <span className="cart_count">
            {cartAllProductsContext.cartProducts &&
              cartAllProductsContext.cartProducts.length}
          </span>
        </span>
      </div>
      {showPopupValue && <Modal showPopupValue={showPopupValue} />}
    </div>
  );
};

export default Notification;
