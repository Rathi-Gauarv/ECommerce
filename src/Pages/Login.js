import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AllProducts, CartAllProducts, ModalContext } from "../Routers";
import "../Styles/Login.css";

const Login = () => {
  const contextValue = useContext(AllProducts);
  const modalContextValues = useContext(ModalContext);
  const cartAllProducts = useContext(CartAllProducts)
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [hintCredential, setHintCredential] = useState(null);
  const [errorMessage, setErrorMessage] = useState(false);
  const [hintPopup, setHintPopup] = useState(false);
  const [userListDetails, setUserListDetails] = useState(null);
  const [showPassword, setShowPassword] = useState(false)
  const adminCredential = {
    email: "admin@gmail.com",
    password: "Admin@123456789",
  };
  const navigate = useNavigate();



  // ------------------------------Onchange--------------------
  const handleOnChange = (e) => {
    if (e.target.name == "email") {
      if (e.target.value == adminCredential?.email) {
        setCredentials({
          ...credentials,
          [e.target.name]: adminCredential?.email.toLowerCase(),
        });
      } else {
        setCredentials({
          ...credentials,
          [e.target.name]: e.target.value.toLowerCase(),
        });
      }
    } else {
      if (e.target.value == adminCredential?.password) {
        setCredentials({
          ...credentials,
          [e.target.name]: adminCredential?.password,
        });
      } else {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
      }
    }
    setErrorMessage(false);
  };

  // -------------------------Submit login btn--------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    const cart = JSON.parse(localStorage.getItem("cartList"));

    function getCart(){
      if(!cart){
        const cartObj = {
          userEmail: credentials?.email,
          cartItems: [],
        };
        localStorage.setItem("cartList", JSON.stringify([cartObj]));
        cartAllProducts.setCartProducts([])
      }else{
        const userCart = cart.find((item)=>item.userEmail == credentials.email)
        if(userCart){
          cartAllProducts.setCartProducts(userCart.cartItems)
        }else{
          const cartObj = {
            userEmail: credentials?.email,
            cartItems:[],
          };
          cart?.push(cartObj)
          localStorage.setItem("cartList", JSON.stringify(cart))
        }
      }
    }
    
    if (credentials?.email == adminCredential?.email) {
      
      if (credentials?.password == adminCredential?.password) {
        localStorage.setItem("admin", true);
        localStorage.setItem("login", JSON.stringify(credentials));
       
        modalContextValues?.setLoginCredential(credentials)
        modalContextValues?.setShowModal(false);
        navigate(modalContextValues?.path ? modalContextValues?.path : "/home");
        getCart();
        contextValue?.setShowProductList(prev => prev+1)
        Swal.fire({  
          title: 'You are Successfully logged in as Admin',  
          icon: 'success'
        })
      } else {
        setErrorMessage("Admin password doesn't match");
      }
    } else {
      const singleUserCredential = userListDetails?.find(item=>item.user_email.toLowerCase() == credentials?.email.toLowerCase())
      if (credentials?.email == singleUserCredential?.user_email) {
        if (credentials?.password == singleUserCredential?.user_password) {
          localStorage.setItem("login", JSON.stringify(credentials));
          localStorage.setItem("hint", JSON.stringify(credentials));
         
          modalContextValues?.setLoginCredential(credentials)
          modalContextValues?.setShowModal(false);
          navigate(modalContextValues?.path);
          getCart()
        contextValue?.setShowProductList(prev => prev+1)
          Swal.fire({  
            title: 'You are Successfully logged in',  
            icon: 'success'
          })
        } else {
          setErrorMessage("Password doesn't match");
        }
      } else {
        setErrorMessage("Email not found");
      }
    }
  };

  // ------------------------------hint popup------------------------
  const handleHintPopup = () => setHintPopup(!hintPopup);
  

  // -------------------------Create new account----------------------
  const handleRegisterPopup = () => modalContextValues?.setShowModal("register");

  // -----------------------bact to home----------------------
  const handleBackToHome = () => {
    navigate("/");
    modalContextValues?.setShowModal(false);
  };

  // ------------------------cross btn-----------------------
  const handleCrossBtn = ()=>{
    modalContextValues?.setShowModal(false);
  }

// -------------------------------outside click------------------------
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, modalContextValues?.setShowModal);

  const hintRef = useRef(null);
  useOutsideAlerter(hintRef, setHintPopup);

  function useOutsideAlerter(ref, popup) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          popup(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }


  // ---------------------------useEffect----------------------------
  useEffect(() => {
    const hintValues = JSON.parse(localStorage.getItem("hint"));
    const userDetails = JSON.parse(localStorage.getItem("userList"));
    setHintCredential(hintValues);
    setUserListDetails(userDetails);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);

  return (
    <div>
      <div className=" flex-center login_full_screen_container">
        <div className="login_container">
          <div ref={wrapperRef}>
            <div className="form-signin bg-light inner_login_container">
          <span className="login_cross_btn" onClick={handleCrossBtn}>X</span>
              <form onSubmit={handleSubmit}>
                <img
                  className="mb-4"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRRMYLaTswxDX7M_l7AG_ja01Qam1CjlNNYA&usqp=CAU"
                  alt=""
                  width="72"
                />
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                <div className="form-floating mb-3">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    onChange={handleOnChange}
                    required
                  />
                  <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    onChange={handleOnChange}
                    required
                  />
                  <span
                    className="eye_container"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <i className="fa-regular fa-eye "></i>
                    ) : (
                      <i className="fa-sharp fa-regular fa-eye-slash"></i>
                    )}
                  </span>
                  <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="errorMessage">{errorMessage}</div>
                <button className="w-100 btn btn-lg btn-dark" type="submit">
                  Sign in
                </button>
                <div className="lower_content_container mt-3 p-2">
                  <div className="mb-2 create_account_text">
                    <span onClick={handleRegisterPopup}>
                      CREATE A NEW ACCOUNT
                    </span>
                  </div>
                  <div className="mb-2 back_to_home_text">
                    <span onClick={handleBackToHome}>Back To Home</span>
                  </div>
                  <div className="hint_container">
                    <span onClick={handleHintPopup}>Hint</span>
                  </div>
                </div>
              </form>
            </div>
            {hintPopup && (
              <div className="hintPopup_container" ref={hintRef}>
                <div>
                  {hintCredential && (
                    <table>
                      <tr className="hint_table_row">
                        <th>User Email </th>
                        <td>: {hintCredential.email}</td>
                      </tr>
                      <tr className="hint_table_row">
                        <th>User Password </th>
                        <td>: {hintCredential.password}</td>
                      </tr>
                    </table>
                  )}
                  <div style={{ marginTop: "20px" }}>
                    <table>
                      <tr className="hint_table_row">
                        <th>Admin Email </th>
                        <td>: {adminCredential.email}</td>
                      </tr>
                      <tr className="hint_table_row">
                        <th>Admin Password </th>
                        <td>: {adminCredential.password}</td>
                      </tr>
                    </table>
                  </div>
                  <buutton
                    className="btn btn-primary mt-4"
                    onClick={() => setHintPopup(false)}
                  >
                    OK
                  </buutton>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
