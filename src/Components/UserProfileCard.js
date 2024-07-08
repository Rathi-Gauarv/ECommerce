import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AllProducts, CartAllProducts, ModalContext } from "../Routers";
import "../Styles/UserProfileCard.css";

const UserProfileCard = (props) => {
  const productList = JSON.parse(localStorage.getItem("productList"));

  const contextValue = useContext(AllProducts);

  const [userProfile, setUserProfile] = useState({
    user_name: "",
    user_email: "",
  });
  const cartAllProductsContext = useContext(CartAllProducts);
  const modalContextValue = useContext(ModalContext);
  const showPopupValue = modalContextValue.showModal;
  const login = JSON.parse(localStorage.getItem("login"));
  const setShowUserProfile = props.setShowUserProfile
  const navigate = useNavigate();

  
  // --------------------------logout-----------------------
  const handleLogout = () => {
    return Swal.fire({
      title: "Are you sure?",
      text: "You want to logout !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout !",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("login");
        localStorage.removeItem("admin");
        contextValue?.setProducts(productList)
        contextValue?.setShowProductList(!contextValue?.showProductList)
        modalContextValue?.setShowModal("login");
        modalContextValue?.setPath(null);
        modalContextValue?.setLoginCredential("");
        cartAllProductsContext.setCartProducts([]);
        cartAllProductsContext.setEmptyCart("empty");
        setShowUserProfile(false)
        navigate("/");
      }
    });
  };


//   ------------------------OutSide Click------------------
  const profileCard = useRef(null);
  useOutsideAlerter(profileCard, setShowUserProfile);

  function useOutsideAlerter(ref, popup) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          popup && popup(false);
         
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

//   ------------------------------useEffect----------------------
  useEffect(() => {
    const userCredentials = JSON.parse(localStorage.getItem("login"));
    setUserProfile({ ...userProfile, ["user_email"]: userCredentials?.email });
  }, []);

  useEffect(()=>{
  const userList = JSON.parse(localStorage.getItem("userList"));
  const login = JSON.parse(localStorage.getItem("login"));
  if(login && userList){
    for(let i=0; i<userList?.length; i++){
        const user = userList?.find((item)=>item.user_email == login?.email)
        if(user){
      setUserProfile({ ["user_name"]:`${user.first_name ? user.first_name: "Unknown"} ${user.last_name && user.last_name}`, ["user_email"]: user?.user_email });
        }
    }
  }
  },[])
  
  console.log("userProfile", userProfile)

  return (
    <div className="profile_card_container" ref={profileCard}>
      <div className="inner_profile_card_container">
        <div className="profile_card-header"></div>
        <div className="profile_card-body">
          <div className="inner">
            <div className="name_text_container">{userProfile.user_email ? userProfile.user_name : "Guest"}</div>
            <div className="color__gray email_text">{userProfile.user_email &&  userProfile.user_email}</div>
          </div>
        </div>
        <div className="profile_card-footer">
          <div className="profile_footer_items my_profile">My Profile</div>
          <div className="profile_footer_items Edit_profile">Edit Profile</div>
          {login && (
            <div
              className="profile_footer_items logout_text"
              onClick={handleLogout}
            >
              Logout
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
