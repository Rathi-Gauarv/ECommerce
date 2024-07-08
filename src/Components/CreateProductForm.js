import React, { Fragment, useEffect, useState } from "react";
import Swal from "sweetalert2";
import "../Styles/CreateProductForm.css";
import { validPrice } from "./Regex";

const CreateProductForm = (props) => {
  let productList = JSON.parse(localStorage.getItem("productList"));
  const [seller_id, setSeller_id] = useState("");

  const setCreatePopup = props.setCreatePopup;
  const contextValue = props.contextValue;
  const setProductAdded = props?.setProductAdded;

  const [newProduct, setNewProduct] = useState({
    id: productList?.length + 1,
    seller_id: !!seller_id ? seller_id : "",
    price: 0,
    product_Name: "",
    product_Desc: "",
    product_Image: "",
    quantity: 0,
    total: 0,
    category: "",
    status: "Pending...",
  });
  const [error, setError] = useState({
    price_error: false,
    quantity_error: false,
  });
  const [categoryNameList, setCategoryNameList] = useState(null);
  const [otherCategory, setOtherCategory] = useState(false);
  const [dropDownArrow, setDropDownArrow] = useState(false);

  // ---------------------OnChange---------------------
  const handleOnChange = (e) => {
    if (e.target.name == "quantity") {
      setOtherCategory(false);
      if (e.target.value == "") {
        setError({ ...error, ["quantity_error"]: false });
      } else {
        if (!validPrice.test(e.target.value)) {
          setError({
            ...error,
            ["quantity_error"]: "only numbers are allowed",
          });
        } else {
          setNewProduct({ ...newProduct, ["quantity"]: +e.target.value });
          setError({ ...error, ["quantity_error"]: false });
        }
      }
    } else if (e.target.name == "price") {
      setOtherCategory(false);
      if (e.target.value == "") {
        setError({ ...error, ["price_error"]: false });
      } else {
        if (!validPrice.test(e.target.value)) {
          setError({ ...error, ["price_error"]: "only numbers are allowed" });
        } else {
          setNewProduct({ ...newProduct, ["price"]: +e.target.value });
          setError({ ...error, ["price_error"]: false });
        }
      }
    } else if (e.target.name == "category") {
      if (e.target.value == "other") {
        setOtherCategory(true);
        setNewProduct({
          ...newProduct,
          [e.target.name]: "",
        });
      } else {
        setOtherCategory(false);
        setNewProduct({
          ...newProduct,
          [e.target.name]: e.target.value.toLowerCase(),
        });
      }
    } else {
      setOtherCategory(false);
      setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    }
  };

  // ------------------------DropDown------------------------

  const handleDropDown = () => {
    setDropDownArrow(!dropDownArrow);
  };

  // ----------------------Cancel Button-----------------------------
  const handleCancel = () => setCreatePopup && setCreatePopup(false);

  // -------------------------Submit Form----------------------
  const handleSubmit = (e) => {
    e.preventDefault();

    if (newProduct.category) {
      productList?.push(newProduct);
      if (!!productList && productList?.length > 0) {
        localStorage.setItem("productList", JSON.stringify(productList));
      } else {
        productList = [];
        productList?.push(newProduct);
        localStorage.setItem("productList", JSON.stringify(productList));
      }

      // contextValue?.setProducts(contextValue?.products)
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: `${newProduct.product_Name} has been successfully added`,
        showConfirmButton: false,
        timer: 2000,
      });
      contextValue?.setShowProductList(true);
      setCreatePopup(false);
      setProductAdded(true);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: "Please fill category !",
      });
    }
  };

  // ---------------------------Custom Category Function-----------------------
  const handleOtherCategory = (e) => {
    setDropDownArrow(false);
    setNewProduct({
      ...newProduct,
      ["category"]: e.target.value.toLowerCase(),
    });
  };

  // -------------------------Category Name List-------------------------
  const handleCategoryName = () => {
    const temp = [];
    for (let i = 0; i < contextValue.products.length; i++) {
      temp.push(contextValue.products[i].category);
    }
    setCategoryNameList([...new Set([...temp])]);
  };

  // ----------------------------useEffect-------------------------
  useEffect(() => {
    handleCategoryName();
  }, []);

  useEffect(() => {
    setNewProduct({
      ...newProduct,
      ["total"]: +(newProduct.quantity * newProduct.price),
    });
  }, [newProduct.price, newProduct.quantity]);

  useEffect(() => {
    const userList = JSON.parse(localStorage.getItem("userList"));
    const loginCredential = JSON.parse(localStorage.getItem("login"));

    const seller = userList?.find(
      (user) => user?.user_email == loginCredential?.email
    );
    if (seller?.seller_id) {
      setSeller_id(seller?.seller_id);
      setNewProduct({ ...newProduct, seller_id: seller?.seller_id });
    }
  }, []);

  return (
    <div className="craeteProductForm_Container">
      <h3 className="heading"> Fill Details to Add Your Product</h3>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3 row">
            {seller_id && (
              <Fragment>
                <label
                  htmlFor="inputSellerId"
                  className="col-4 col-form-label "
                >
                  User Id
                </label>
                <div className="col-8" style={{ marginBottom: "10px" }}>
                  <input
                    type="text"
                    className="form-control"
                    name="inputSellerId"
                    id="inputSellerId"
                    value={seller_id}
                    // onChange={handleOnChange}
                    readOnly
                  />
                </div>
              </Fragment>
            )}
            <label htmlFor="product_Name" className="col-4 col-form-label ">
              Product Name
            </label>
            <div className="col-8" style={{ marginBottom: "10px" }}>
              <input
                type="text"
                className="form-control"
                name="product_Name"
                id="inputName"
                placeholder="Product Name"
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
                onChange={handleOnChange}
              />
            </div>
            <label htmlFor="inputCategory" className="col-4 col-form-label">
              Cateogry
            </label>
            <div className="col-8 " style={{ marginBottom: "10px" }}>
              <span className="dropdown_field" onClick={handleDropDown}>
                <select
                  id="inputCategory"
                  className="form-control "
                  name="category"
                  placeholder="category"
                  onChange={handleOnChange}
                >
                  <option value="" placeholder="category">
                    Select Category
                  </option>

                  {categoryNameList &&
                    categoryNameList.map((item, i) => {
                      return (
                        <option value={item} key={i}>
                          {item}
                        </option>
                      );
                    })}
                  <option value="other" placeholder="category">
                    other
                  </option>
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
                  id="'otherCategory_input"
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
                onChange={handleOnChange}
                required
              />
              <div className="createForm_error createForm_price_error">
                {error.price_error && error.price_error}
              </div>
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
                onChange={handleOnChange}
                required
              />
              <div className="createForm_error createForm_quantity_error">
                {error.quantity_error && error.quantity_error}
              </div>
            </div>
            <label htmlFor="inputTotal" className="col-4 col-form-label">
              Total
            </label>
            <div className="col-8" style={{ marginBottom: "10px" }}>
              <input
                type="text"
                className="form-control"
                name="total"
                id="inputTotal"
                value={newProduct.total}
                placeholder="Total (Quantity * Price)"
                readOnly
              />
            </div>
          </div>

          <div className="mb-3">
            <button type="submit" className="btn btn-primary add_btn">
              Add
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

export default CreateProductForm;
