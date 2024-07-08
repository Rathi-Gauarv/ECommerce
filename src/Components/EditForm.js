import React, { useContext, useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { CartAllProducts } from "../Routers";
import "../Styles/CreateProductForm.css";
import { validPrice } from "./Regex";

const EditForm = (props) => {
  const productList = JSON.parse(localStorage.getItem("productList"));
  const editableProduct = props?.editableProduct;
  const [product, setProduct] = useState(editableProduct);
  const cartProductsContext = useContext(CartAllProducts);
  const setEditPopup = props?.setEditPopup;
  const contextValue = props?.contextValue;
  const setProductAdded = props?.setProductAdded;
  const [edit_error, setEdit_error] = useState({
    edit_price_error: false,
    edit_quantity_error: false,
  });

  const [categoryNameList, setCategoryNameList] = useState(null);
  const [otherCategory, setOtherCategory] = useState(false);
  const [dropDownArrow, setDropDownArrow] = useState(false);

  // ------------------OnChange function-------------------------
  const handleOnChange = (e) => {
    if (e.target.name == "quantity") {
      setOtherCategory(false);
      if (e.target.value == "") {
        setEdit_error({ ...edit_error, ["edit_quantity_error"]: false });
      } else {
        if (!validPrice.test(e.target.value)) {
          setEdit_error({
            ...edit_error,
            ["edit_quantity_error"]: "only numbers are allowed",
          });
        } else {
          setProduct({ ...product, ["quantity"]: +e.target.value });
          setEdit_error({ ...edit_error, ["edit_quantity_error"]: false });
        }
      }
    } 
    else if (e.target.name == "price") {
      setOtherCategory(false);
      if (e.target.value == "") {
        setEdit_error({ ...edit_error, ["edit_price_error"]: false });
      } else {
        if (!validPrice.test(e.target.value)) {
          setEdit_error({
            ...edit_error,
            ["edit_price_error"]: "only numbers are allowed",
          });
        } else {
          setProduct({ ...product, ["price"]: +e.target.value });
          setEdit_error({ ...edit_error, ["edit_price_error"]: false });
        }
      }
    } 
    else if (e.target.name == "category") {
      if (e.target.value == "other") {
        setOtherCategory(true);
        setProduct({ ...product, ["category"]: "" });
      } else {
        setOtherCategory(false);
        setProduct({ ...product, ["category"]: e.target.value });
      }
    } else {
      setOtherCategory(false);
      setProduct({ ...product, [e.target.name]: e.target.value });
    }
  };

  // ------------------------DropDown------------------------

  const handleDropDown = () => {
    setDropDownArrow(!dropDownArrow);
  };

  // --------------------------Update Product---------------------------
  const handleUpdate = (e) => {
    e.preventDefault();
    if(!edit_error.edit_price_error && !edit_error.edit_quantity_error ){
      const index = productList?.findIndex((el) => el.id == product?.id);

      productList[index].product_Name = product.product_Name;
      productList[index].product_Image = product.product_Image;
      productList[index].product_Desc = product.product_Desc;
      productList[index].price = +product.price;
      productList[index].quantity = +product.quantity;
      productList[index].category = product.category;
      productList[index].total = +product.total;
      if (productList && productList?.length > 0) {
        localStorage.setItem("productList", JSON.stringify(productList));
      }
  
      if (cartProductsContext.cartProducts.length > 0) {
        const cartProductIndex = cartProductsContext.cartProducts.findIndex(
          (el) => el.id == product.id
        );
        if (cartProductsContext.cartProducts[cartProductIndex]) {
          cartProductsContext.cartProducts[cartProductIndex].product_Name =
            product.product_Name;
          cartProductsContext.cartProducts[cartProductIndex].product_Image =
            product.product_Image;
          cartProductsContext.cartProducts[cartProductIndex].product_Desc =
            product.product_Desc;
          cartProductsContext.cartProducts[cartProductIndex].price =
            +product.price;
          cartProductsContext.cartProducts[cartProductIndex].category =
            product.category;
          cartProductsContext.cartProducts[cartProductIndex].total = +(
            cartProductsContext.cartProducts[cartProductIndex].price *
            cartProductsContext.cartProducts[cartProductIndex].quantity
          );
          cartProductsContext.setCount(!cartProductsContext.count);
        }
      }
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: `${product.product_Name} has been successfully update`,
        showConfirmButton: false,
        timer: 2000,
      });
      setEditPopup && setEditPopup(false);
      contextValue?.setShowProductList(true);
      setProductAdded(true);
    }
  };

  // ---------------------------Cancel Button-------------------------
  const handleCancel = () => setEditPopup && setEditPopup(false);

  // --------------------Custom Category Function----------------
  const handleOtherCategory = (e) => {
    setProduct({ ...product, ["category"]: e.target.value.toLowerCase() });
  };

  // ------------------------Category Name List------------------------
  const handleCategoryName = () => {
    const temp = [];
    for (let i = 0; i < contextValue.products.length; i++) {
      temp.push(contextValue.products[i].category);
    }
    setCategoryNameList([...new Set([...temp])]);
  };

  // --------------------useEffect-------------------
  useEffect(() => {
    handleCategoryName();
  }, []);

  useEffect(() => {
    setProduct({ ...product, ["total"]: +(product.price * product.quantity) });
  }, [product.price, product.quantity]);

  return (
    <div className="craeteProductForm_Container">
      <h3 className="heading">Product Details</h3>
      <div className="container">
        <form onSubmit={handleUpdate}>
          <div className="mb-3 row">
            <label htmlFor="inputid" className="col-4 col-form-label ">
              Product ID
            </label>
            <div className="col-8" style={{ marginBottom: "10px" }}>
              <input
                type="text"
                className="form-control"
                name="id"
                id="inputid"
                value={product.id}
                readOnly
              />
            </div>
            <label htmlFor="inputName" className="col-4 col-form-label ">
              Product Name
            </label>
            <div className="col-8" style={{ marginBottom: "10px" }}>
              <input
                type="text"
                className="form-control"
                name="product_Name"
                id="inputName"
                placeholder="Product Name"
                defaultValue={product.product_Name}
                onChange={handleOnChange}
                required
              />
            </div>
            <label htmlFor="inputDesc" className="col-4 col-form-label">
              Description
            </label>
            <div className="col-8" style={{ marginBottom: "10px" }}>
              <input
                type="text"
                className="form-control"
                name="product_Desc"
                id="inputDesc"
                placeholder="Description"
                defaultValue={product.product_Desc}
                onChange={handleOnChange}
              />
            </div>
            <label htmlFor="inputImage" className="col-4 col-form-label">
              Image URL
            </label>
            <div className="col-8" style={{ marginBottom: "10px" }}>
              <input
                type="text"
                className="form-control"
                name="product_Image"
                id="inputImage"
                placeholder="URL"
                defaultValue={product.product_Image}
                onChange={handleOnChange}
              />
            </div>
            <label htmlFor="inputCategory" className="col-4 col-form-label">
              Cateogry
            </label>
            <div className="col-8" style={{ marginBottom: "10px" }}>
              <span className="dropdown_field" onClick={handleDropDown}>
                <select
                  id="inputCategory"
                  className="form-control"
                  name="category"
                  onChange={handleOnChange}
                  value={otherCategory ? "other" : product.category}
                >
                  {categoryNameList &&
                    categoryNameList.map((item, i) => {
                      return (
                        <option value={item} key={i}>
                          {item}
                        </option>
                      );
                    })}
                  <option value="other">Other</option>
                </select>
                <span className="dropdown_arrow">
                  {dropDownArrow ? (
                    <i className="fa-solid fa-angle-up"></i>
                  ) : (
                    <i className="fa-solid fa-angle-down"></i>
                  )}
                </span>
              </span>
              {otherCategory && (
                <input
                  type="text"
                  className="form-control"
                  name="category"
                  id="otherCategory_input"
                  placeholder="Category"
                  onChange={handleOtherCategory}
                  required
                />
              )}
            </div>
            <label htmlFor="inputPrice" className="col-4 col-form-label">
              Price
            </label>
            <div className="col-8" style={{ marginBottom: "10px" }}>
              <input
                type="text"
                className="form-control"
                name="price"
                id="inputPrice"
                placeholder="Price"
                defaultValue={product.price}
                onChange={handleOnChange}
                required
              />
              <div className="createForm_error createForm_price_error">{edit_error.edit_price_error && edit_error.edit_price_error}</div>
            </div>
            <label htmlFor="inputQuantity" className="col-4 col-form-label">
              Quantity
            </label>
            <div className="col-8" style={{ marginBottom: "10px" }}>
              <input
                type="text"
                className="form-control"
                name="quantity"
                id="inputQuantity"
                placeholder="Quantity"
                defaultValue={product.quantity}
                onChange={handleOnChange}
                required
              />
              <div className="createForm_error createForm_quantity_error">{edit_error.edit_quantity_error && edit_error.edit_quantity_error}</div>
            </div>
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary add_btn">
              Update
            </button>
            <button
              type="submit"
              className="btn btn-primary cancel_btn"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditForm;
