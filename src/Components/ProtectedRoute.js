import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ModalContext } from "../Routers";

const ProtectedRoute = ({ Component, path }) => {
  const protectedModalContext = useContext(ModalContext);
  const [showComponent, setShowComponent] = useState(false);
  const navigate = useNavigate();
  

  useEffect(() => {
    const loginData = JSON.parse(localStorage.getItem("login"))
    // const adminData = localStorage.getItem("admin");

    const userList = JSON.parse(localStorage.getItem("userList"))
    const userCedential = userList.find( user => user?.user_email == loginData?.email)
    if (path == "/productmaster") {
      // if (!userCedential?.seller_id) {
      //   if (!loginData) {
      //     protectedModalContext?.setShowModal("login");
      //     protectedModalContext?.setPath(path);
      //   } else {
      //     navigate("/");
      //   }
      // } else {
        setShowComponent(true);
      // }
    } else {
      if (!loginData) {
        protectedModalContext?.setShowModal("login");
        protectedModalContext?.setPath(path);
      } else {
        setShowComponent(true);
      }
    }
  }, [protectedModalContext]);

  return <div>{showComponent && <Component />}</div>;
};

export default ProtectedRoute;


const ProtectedHome = ({ Component, path }) => {
  const homeProtectedModalContext = useContext(ModalContext);

  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const adminData = localStorage.getItem("admin");
    const loginData = localStorage.getItem("login");
    if (!adminData) {
      if (!loginData) {
        homeProtectedModalContext?.setShowModal("login");
        homeProtectedModalContext?.setPath(path);
      } else {
        navigate("/");
      }
    } else {
      setShow(true);
    }
  }, [homeProtectedModalContext]);

  return <div>{show && <Component />}</div>;
};

export { ProtectedHome };
