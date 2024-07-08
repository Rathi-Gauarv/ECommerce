import React, { createContext, Fragment, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Menu from "./Components/Menu";
import Notification from "./Components/Notification";
import Poster from "./Components/Poster";
import Data from "./Data";
import Cart from "./Pages/Cart";
import Home from "./Pages/Home";
import ProductMaster from "./Pages/ProductMaster";
import Shopping from "./Pages/Shopping";
import CategoryProducts from "./Pages/CategoryProducts";
import "./Styles/Routers.css";
import ProtectedRoute, { ProtectedHome } from "./Components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllProducts = createContext();
const CartAllProducts = createContext();
const ModalContext = createContext();

const Routers = () => {
  const [products, setProducts] = useState(null);
  const [loginCredential, setLoginCredential] = useState(
    JSON.parse(localStorage.getItem("login"))
  );
  const [cartProducts, setCartProducts] = useState(getcartItems());
  const [count, setCount] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [path, setPath] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [seller, setSeller] = useState(false);
  const [showProductList, setShowProductList] = useState(false);
  const [emptyCart, setEmptyCart] = useState(false);

  // ---------------------------get cart items initially-----------------------
  function getcartItems() {
    const cartList = JSON.parse(localStorage.getItem("cartList"));

    const userCartObj = cartList?.find(
      (item) => item.userEmail == loginCredential?.email
    );
    if (loginCredential) {
      if (userCartObj) {
        return userCartObj.cartItems;
      } else {
        return [];
      }
    } else {
      return [];
    }
  }

  // -----------------------------check initially admin credential for menu bar----------------------
  useEffect(() => {
    const login = JSON.parse(localStorage.getItem("login"));
    const adminLoggedIn = localStorage.getItem("admin");
    const userList = JSON.parse(localStorage.getItem("userList"));
    const seller = userList?.find((user) => user?.user_email == login?.email);
    if (seller?.seller_id) {
      setSeller(true);
    } else {
      setSeller(false);
    }
    setAdmin(!!adminLoggedIn);
  }, [showModal]);

  // ---------------------------get product list------------------------
  useEffect(() => {
    const productList = JSON.parse(localStorage.getItem("productList"));
    const login = JSON.parse(localStorage.getItem("login"));
    const userList = JSON.parse(localStorage.getItem("userList"));

    if (productList && productList?.length > 0) {
      if (login) {
        if (login.email !== "admin@gmail.com") {
          const sellerCredential = userList.find(
            (user) => user.user_email == login.email
          );
          if (sellerCredential.seller_id) {
            const seller_data = productList?.filter(
              (item) => item.seller_id == sellerCredential.seller_id
            );
            setProducts(seller_data);
          }
        } else {
          setProducts(productList);
        }
      } else {
        setProducts(productList);
      }
      setShowProductList(false);
      console.log("productList", productList);
      console.log("get product master list useEffect");
    } else {
      localStorage.setItem("productList", JSON.stringify(Data));
      setShowProductList((pre) => !pre);
    }
  }, [showProductList]);

  // ------------------------------user list-------------------------
  useEffect(() => {
    const userList = [
      {
        first_name: "Tony",
        last_name: "Stark",
        user_email: "tony@gmail.com",
        user_password: "Tony@123456789",
      },
      {
        first_name: "Captain",
        last_name: "America",
        user_email: "captain@gmail.com",
        user_password: "Captain@123456789",
      },
      {
        first_name: "Bruce",
        last_name: "Banner",
        user_email: "bruce@gmail.com",
        user_password: "Bruce@123456789",
      },
      {
        first_name: "Dr.",
        last_name: "Strange",
        user_email: "strange@gmail.com",
        user_password: "Strange@123456789",
      },
    ];

    const getUserList = JSON.parse(localStorage.getItem("userList"));
    if (!getUserList) {
      localStorage.setItem("userList", JSON.stringify(userList));
    } else {
      localStorage.setItem("userList", JSON.stringify(getUserList));
    }
  }, []);

  // -------------------------------cartList------------------------
  useEffect(() => {
    const cartList = JSON.parse(localStorage.getItem("cartList"));

    const login = JSON.parse(localStorage.getItem("login"));
    if (!cartList) {
      if (login) {
        const cartObj = {
          userEmail: loginCredential?.email ? loginCredential?.email : "",
          cartItems: [],
        };
        localStorage.setItem("cartList", JSON.stringify([cartObj]));
        // setEmptyCart(!emptyCart)
      }
      // else{
      //   localStorage.setItem("cartList", JSON.stringify(cartList));
      // }
    } else {
      if (login) {
        const userCartObj = cartList?.find(
          (item) => item.userEmail == loginCredential?.email
        );
        if (userCartObj) {
          setCartProducts(userCartObj?.cartItems);
        } else {
          setCartProducts([]);
        }
      }
    }
  }, []);

  // -------------------------------update cartlist--------------------------
  useEffect(() => {
    const cartList = JSON.parse(localStorage.getItem("cartList"));

    if (cartList && loginCredential) {
      const userCartObj = cartList?.find(
        (item) => item.userEmail == loginCredential?.email
      );
      if (!userCartObj) {
        const cartObj = {
          userEmail: loginCredential?.email ? loginCredential?.email : "",
          cartItems: cartProducts ? cartProducts : [],
        };
        cartList?.push(cartObj);
        localStorage.setItem("cartList", JSON.stringify(cartList));
      } else {
        userCartObj["cartItems"] = cartProducts;
        const index = cartList?.findIndex(
          (item) => item.userEmail == loginCredential?.email
        );
        cartList.splice(index, 1);
        cartList.push(userCartObj);
        localStorage.setItem("cartList", JSON.stringify(cartList));
      }
    }
  }, [cartProducts, emptyCart]);

  return (
    <Fragment>
      <ModalContext.Provider
        value={{ showModal, setShowModal, setPath, path, setLoginCredential }}
      >
        <AllProducts.Provider
          value={{ products, setProducts, setShowProductList, showProductList }}
        >
          <CartAllProducts.Provider
            value={{
              cartProducts,
              setCartProducts,
              count,
              setCount,
              setEmptyCart,
              loginCredential,
            }}
          >
            <ToastContainer />
            <div className="notification_main_container">
              <Notification />
            </div>
            <Poster />
            {(seller || admin) && (
              <div className="menu_main_container">
                <Menu />
              </div>
            )}
            <Routes>
              <Route
                path="/home"
                element={<ProtectedHome Component={Home} path="/home" />}
              />
              <Route path="/" element={<Shopping />} />
              <Route path="/:category" element={<CategoryProducts />} />
              <Route
                path="/productmaster"
                element={
                  <ProtectedRoute
                    Component={ProductMaster}
                    path="/productmaster"
                  />
                }
              />
              <Route
                path="/cart"
                element={<ProtectedRoute Component={Cart} path="/cart" />}
              />
            </Routes>
          </CartAllProducts.Provider>
        </AllProducts.Provider>
      </ModalContext.Provider>
    </Fragment>
  );
};

export default Routers;
export { AllProducts };
export { CartAllProducts };
export { ModalContext };
