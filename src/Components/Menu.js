import React  from "react";
import "../Styles/Menu.css";
import { useNavigate } from "react-router-dom";

const Menu = () => {

  const navigate = useNavigate();

  const handleShopping = (e) =>{
    e.preventDefault()
    navigate("/");
  } 

  const handleProductMaster = (e) => {
    e.preventDefault()
      navigate("/productmaster");
  };

  return (
    <div className="menu_container">
      <span className="shopping menu_item" onClick={handleShopping}>
        Shopping
      </span>
      <span className="product_master menu_item" onClick={handleProductMaster}>
        Product Master
      </span>
    </div>
  );
};

export default Menu;
