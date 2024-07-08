import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  Fragment,
} from "react";
import CreateProductForm from "../Components/CreateProductForm";
import EditForm from "../Components/EditForm";
import FilterConditionPopup from "../Components/FilterConditionPopup";
import Pagination from "../Components/Pagination";
import { AllProducts } from "../Routers";
import "../Styles/ProductMaster.css";
import * as XLSX from "xlsx/xlsx.mjs";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ExportButton from "../Components/ExportButton";
import Swal from "sweetalert2";
import ExportAs from "../Components/ExportAs";

const ProductMaster = () => {
  const loginCredential = JSON.parse(localStorage.getItem("login"));
  const contextValue = useContext(AllProducts);
  const [sellerData, setSellerData] = useState(null);
  const [productAdded, setProductAdded] = useState(false);
  const [categoryNameList, setCategoryNameList] = useState(null);
  // const [sortingArray, setSortingArray] = useState(null);
  const [page, setPage] = useState(1);
  const [productPerPage, setProductPerPage] = useState(5);
  const [categoryProducts, setCategoryProducts] = useState(null);

  const [createPopup, setCreatePopup] = useState(false);
  const [editPopup, setEditPopup] = useState(false);
  const [editableProduct, setEditableProduct] = useState(null);
  const [sortPrice, setSortPrice] = useState(true);
  const [showPriceArrow, setShowPriceArrow] = useState(false);
  const [categoryBackground, setCategoryBackground] = useState(null);
  const [name_dot_filter, setName_dot_filter] = useState(false);
  const [filterConditionPopup, setFilterConditionPopup] = useState(false);

  const [dropDownCondition, setDropDownCondition] = useState({
    dropDownvalue1: "Contains",
    dropDownvalue2: "Contains",
  });
  const [filteredProducts1, setFilteredProducts1] = useState(null);
  const [filteredProducts2, setFilteredProducts2] = useState(null);
  const [finalFilteredProducts, setFinalFilteredProducts] = useState(null);
  const [openFilterForColoumn, setOpenFilterForColoumn] = useState(true);
  const [dotsBackground, setDotsBackground] = useState({
    product_Name: "",
    product_Desc: "",
  });
  const [tableColumnNumber, setTableColumnNumber] = useState(0);
  const [statusCheckBox, setStatusCheckBox] = useState(false);
  const [Operator, setOperator] = useState("And");
  const [categoryname, setCategoryName] = useState(null);
  const [selectValue, setSelectValue] = useState("All")

  const handleCreatePopup = () => {
    setProductAdded(false);
    setCreatePopup(!createPopup);
  };

  const handleEditPopup = (product) => {
    setProductAdded(false);
    setEditPopup(!editPopup);
    setEditableProduct(product);
  };

  const handleCategoryName = (category) => {
    setCategoryName(category);
  };

  // -----------------------Outside click---------------------
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setCreatePopup, setEditPopup);

  const filterPopupRef = useRef(null);
  useOutsideAlerter(filterPopupRef, setFilterConditionPopup);

  function useOutsideAlerter(ref, popup1, popup2) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          popup1 && popup1(false);
          popup2 && popup2(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  // ----------------------Categories Array-----------------------

  const getCateogryProducts = (e) => {
    const temp = [...contextValue?.products];
    let filteredProducts = null;
    if (!e) {
      setCategoryBackground("all");
      setCategoryProducts(contextValue?.products);
    } else if (e?.target?.id == "all") {
      setCategoryBackground(e?.target?.id);
      setCategoryProducts(contextValue?.products);
    } else {
      setCategoryBackground(e?.target?.id);
      filteredProducts = temp?.filter(
        (item) => item?.category == e?.target?.id
      );
      setCategoryProducts(filteredProducts);
    }
    setSortPrice(true);
    setPage(page);
  };

  // --------------------------Sorting Acc to Price-------------------------
  const handlePriceSorting = () => {
    setSortPrice((prev) => !prev);
    setShowPriceArrow(true)
  };

  // -------------------------Price sorting------------------------------
  const getPriceSorting = () => {
    const temp = categoryProducts && [...categoryProducts];
    if (temp) {
      if (sortPrice) {
        temp.sort((a, b) => {
          return a?.price - b?.price;
        });
        // setSortingArray(temp);
        setCategoryProducts(temp);
      } else {
        temp.sort((a, b) => {
          return b?.price - a?.price;
        });
        // setSortingArray(temp);
        setCategoryProducts(temp);
      }
    }
  };

  // -------------------------------dots-------------------------------
  const handleDotsFilter = (coloumnHeading) => {
    setOpenFilterForColoumn(coloumnHeading);
    setFilterConditionPopup(!filterConditionPopup);
    setDropDownCondition({
      dropDownvalue1: "Contains",
      dropDownvalue2: "Contains",
    });
  };

  // ------------------------------set products of dropdown1----------------

  const handleFilterDropDown1 = (e) => {
    if (dropDownCondition.dropDownvalue1 == "Contains") {
      const filteredItems = categoryProducts.filter((item) =>
        item[openFilterForColoumn]
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      );
      setFilteredProducts1(filteredItems);
    } else if (dropDownCondition.dropDownvalue1 == "Does not contain") {
      const filteredItems = categoryProducts.filter(
        (item) =>
          !item[openFilterForColoumn]
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
      );
      setFilteredProducts1(filteredItems);
    } else if (dropDownCondition.dropDownvalue1 == "Is equal to") {
      const filteredItems = categoryProducts.filter(
        (item) =>
          item[openFilterForColoumn].toLowerCase() ==
          e.target.value.toLowerCase()
      );
      setFilteredProducts1(filteredItems);
    } else if (dropDownCondition.dropDownvalue1 == "Is not equal to") {
      const filteredItems = categoryProducts.filter(
        (item) =>
          item[openFilterForColoumn].toLowerCase() !=
          e.target.value.toLowerCase()
      );
      setFilteredProducts1(filteredItems);
    } else if (dropDownCondition.dropDownvalue1 == "Starts with") {
      const filteredItems = categoryProducts.filter((item) =>
        item[openFilterForColoumn]
          .toLowerCase()
          .startsWith(e.target.value.toLowerCase())
      );
      setFilteredProducts1([...new Set(filteredItems ? filteredItems : "")]);
    } else if (dropDownCondition.dropDownvalue1 == "Ends with") {
      console.log("ends with in dropdown1_input ");
      const filteredItems = categoryProducts.filter((item) =>
        item[openFilterForColoumn]
          .toLowerCase()
          .endsWith(e.target.value.toLowerCase())
      );

      setFilteredProducts1([...new Set(filteredItems ? filteredItems : "")]);
    }
  };

  // ------------------------------set products of dropdown2----------------
  const handleFilterDropDown2 = (e) => {
    let productsForFilter2 = [];

    if (Operator == "Or") {
      productsForFilter2 = categoryProducts ? [...categoryProducts] : [];
    } else {
      productsForFilter2 = filteredProducts1
        ? [...filteredProducts1]
        : [...categoryProducts];
    }
    if (dropDownCondition.dropDownvalue2 == "Contains") {
      const filteredItems = productsForFilter2.filter((item) =>
        item[openFilterForColoumn]
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      );
      setFilteredProducts2(filteredItems);
    } else if (dropDownCondition.dropDownvalue2 == "Does not contain") {
      const filteredItems = productsForFilter2.filter(
        (item) =>
          !item[openFilterForColoumn]
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
      );
      setFilteredProducts2(filteredItems);
    } else if (dropDownCondition.dropDownvalue2 == "Is equal to") {
      const filteredItems = productsForFilter2.filter(
        (item) =>
          item[openFilterForColoumn].toLowerCase() ==
          e.target.value.toLowerCase()
      );
      setFilteredProducts2(filteredItems);
    } else if (dropDownCondition.dropDownvalue2 == "Is not equal to") {
      const filteredItems = productsForFilter2.filter(
        (item) =>
          item[openFilterForColoumn].toLowerCase() !=
          e.target.value.toLowerCase()
      );
      setFilteredProducts2(filteredItems);
    } else if (dropDownCondition.dropDownvalue2 == "Starts with") {
      const filteredItems = productsForFilter2.filter((item) =>
        item[openFilterForColoumn]
          .toLowerCase()
          .startsWith(e.target.value.toLowerCase())
      );
      setFilteredProducts2([...new Set(filteredItems ? filteredItems : "")]);
    } else if (dropDownCondition.dropDownvalue2 == "Ends with") {
      console.log("ends with in dropdown2_input ");
      const filteredItems = productsForFilter2.filter((item) =>
        item[openFilterForColoumn]
          .toLowerCase()
          .endsWith(e.target.value.toLowerCase())
      );
      setFilteredProducts2([...new Set(filteredItems ? filteredItems : "")]);
    }
  };

  // ---------------------handle filter button--------------------
  const handleFinalFilterCondition = () => {
    if (Operator == "Or") {
      if (filteredProducts1?.length > 0 && filteredProducts2?.length > 0) {
        setFinalFilteredProducts([
          ...new Set([...filteredProducts1, ...filteredProducts2]),
        ]);
      } else if (filteredProducts1?.length > 0) {
        setFinalFilteredProducts([...new Set([...filteredProducts1])]);
      } else if (filteredProducts2?.length > 0) {
        setFinalFilteredProducts([...new Set([...filteredProducts2])]);
      } else {
        setFinalFilteredProducts([]);
      }
    } else {
      if (filteredProducts2) {
        setFinalFilteredProducts([...new Set([...filteredProducts2])]);
      } else if (filteredProducts1) {
        setFinalFilteredProducts([...new Set([...filteredProducts1])]);
      } else {
        setFinalFilteredProducts([]);
      }
    }
    if (openFilterForColoumn == "product_Name") {
      setDotsBackground({
        ...dotsBackground,
        ["product_Name"]: openFilterForColoumn,
      });
    } else if (openFilterForColoumn == "product_Desc") {
      setDotsBackground({
        ...dotsBackground,
        ["product_Desc"]: openFilterForColoumn,
      });
    }
    setFilterConditionPopup(false);
  };

  // -------------------------operator-----------------------
  function handleOperatorValue(e) {
    setOperator(e.target.value);
  }

  // -------------------------handle clear button------------------
  const handleClearFilterCondition = () => {
    setFinalFilteredProducts(null);
    setFilterConditionPopup(false);
    setOpenFilterForColoumn(true);
    setDotsBackground({ ["product_Name"]: "", ["product_Desc"]: "" });
    setOperator("And");
  };

  const exportToCSV = (type, fn, dl) => {
    var table = document.getElementById("productList_table");
    const newTable = table.cloneNode(true);
    const newTableColumnLength = newTable.rows[0].cells.length;
    const rowCount = newTable.rows.length;
    let actionCellIndex = newTableColumnLength - 1;
    for (var i = 0; i < rowCount; i++) {
      newTable.rows[i].deleteCell(actionCellIndex);
    }
    var wb = XLSX.utils.table_to_book(newTable, { sheet: "sheet1" });

    return dl
      ? XLSX.write(wb, { bookType: type, bookSST: true, type: "base64" })
      : XLSX.writeFile(wb, fn || "MySheetName." + (type || "xlsx"));
  };

  const exportToPdf = () => {
    const table = document.querySelector("#productList_table");
    const newTable = table?.cloneNode(true);
    const newTableColumnLength = newTable?.rows[0]?.cells?.length;
    const rowCount = newTable?.rows?.length;
    let actionCellIndex = newTableColumnLength - 1;
    for (let i = 0; i < rowCount; i++) {
      newTable.rows[i].deleteCell(actionCellIndex);
    }
    const doc = new jsPDF({ orientation: "landscape" });
    doc.autoTable({
      columnStyles: {
        0: {
          cellWidth: 50,
        },
        1: {
          cellWidth: 50,
        },
        2: {
          cellWidth: 50,
        },
      },
      html: newTable,
    });
    doc.save("table.pdf");
  };

  // ------------------------Product Status--------------------------

  const handleStatus = (item) => {
    const input = document.querySelector(".product_status_input");
    console.log("{handleStatus", input.checked);
    const filteredProduct = contextValue?.products?.find(
      (product) => product.id == item.id
    );
    const filteredProductIndex = contextValue?.products?.findIndex(
      (product) => product.id == item.id
    );
    if (filteredProduct.status == "Approved") {
      Swal.fire({
        title: "Submit your remark to reject",
        input: "text",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "Reject",
        showLoaderOnConfirm: true,
        preConfirm: (text) => {
          if (text) {
            return text;
          } else {
            Swal.showValidationMessage(`Please submit your remark`);
          }
        },
        allowOutsideClick: () => !Swal.isLoading(),
      }).then((result) => {
        if (result.isConfirmed) {
          filteredProduct.status = "Rejected";
          filteredProduct.adminRemark = result.value;
          contextValue?.products?.splice(
            filteredProductIndex,
            1,
            filteredProduct
          );
          contextValue?.setProducts(contextValue?.products);
          localStorage.setItem(
            "productList",
            JSON.stringify(contextValue?.products)
          );
          setStatusCheckBox(!statusCheckBox);
          setProductAdded(true);
          Swal.fire({
            icon: "success",
            title: "Product has been rejected",
          });
        }
      });
    } else {
      filteredProduct.status = "Approved";
      filteredProduct.adminRemark = "Approved";
    }
    console.log("filteredProduct", filteredProduct);
    contextValue?.products?.splice(filteredProductIndex, 1, filteredProduct);

    contextValue?.setProducts(contextValue?.products);
    localStorage.setItem("productList", JSON.stringify(contextValue?.products));
    setStatusCheckBox(!statusCheckBox);
  };

  // ---------------------------Status Sorting-------------------
  
  const handleStatusSorting = (e)=>{
    setSelectValue(e.target.value)
    if(e.target.value == "All"){
      setFinalFilteredProducts(null)
    }
    else {
      const filteredProducts = categoryProducts?.filter(item => item.status.includes(e.target.value))
      if(filteredProducts){
        setFinalFilteredProducts(filteredProducts)
      }else{
        setFinalFilteredProducts([])
      }
    }
  }

 
  // -------------------------useEffect-------------------------

  useEffect(() => {
    const nameList = [];
    if (contextValue?.products?.length > 0) {
      for (let i = 0; i < contextValue?.products?.length; i++) {
        nameList.push(contextValue?.products[i]?.category);
      }
    }
    setCategoryNameList([...new Set(nameList)]);
  }, [createPopup, editPopup, productAdded]);

  useEffect(() => {
    getCateogryProducts(categoryname && categoryname);
    setProductAdded(false);
  }, [productAdded]);

  useEffect(() => {
    getPriceSorting();
  }, [sortPrice]);

  useEffect(() => {
    const table =
      document.getElementById("productList_table").rows[0].cells.length;
    setTableColumnNumber(table);
  }, []);


  return (
    <div className="productMaster_Container">
      <div className="createNew_btn_container">
        <button className="createNew_btn" onClick={handleCreatePopup}>
          Create New
        </button>
        {/* <ExportButton download={{ exportToCSV, exportToPdf }} />*/}
        <ExportAs download={{ exportToCSV, exportToPdf }} />
      </div>
      <div className="categories_container">
        <span
          className={
            categoryBackground == "all" ? "selectedCategory" : "category"
          }
          id="all"
          onClick={(e)=>{
            getCateogryProducts(e)
            handleCategoryName(e)
          }}
        >
          All
        </span>
        {categoryNameList &&
          categoryNameList.map((item, index) => {
            return (
              <span
                className={
                  categoryBackground == item ? "selectedCategory" : "category"
                }
                key={index}
                id={item}
                onClick={(e) => {
                  getCateogryProducts(e);
                  handleCategoryName(e);
                }}
              >
                {item.toUpperCase()}
              </span>
            );
          })}
      </div>
      <div className="table-responsive min-vh-100%">
        <table className="table table-primary" id="productList_table">
          <thead className="product_table_thead">
            <tr>
              <th className="column_head" scope="col">
                Product Name
                <span
                  className={
                    finalFilteredProducts &&
                    dotsBackground["product_Name"] == "product_Name"
                      ? "dots_container_after_filter"
                      : "dots_container"
                  }
                >
                  <i
                    className="fa-solid fa-ellipsis-vertical"
                    onClick={() => handleDotsFilter("product_Name")}
                  ></i>
                  {filterConditionPopup &&
                    openFilterForColoumn == "product_Name" && (
                      <FilterConditionPopup
                        setDropDownCondition={setDropDownCondition}
                        handleFilterDropDown1={handleFilterDropDown1}
                        handleFilterDropDown2={handleFilterDropDown2}
                        dropDownCondition={dropDownCondition}
                        popup={setFilterConditionPopup}
                        clear={handleClearFilterCondition}
                        handleOperatorValue={handleOperatorValue}
                        handleFinalFilterCondition={handleFinalFilterCondition}
                        filterPopupRef={filterPopupRef}
                      />
                    )}
                </span>
              </th>
              <th className="column_head" scope="col">
                Decription
                <span
                  className={
                    finalFilteredProducts &&
                    dotsBackground["product_Desc"] == "product_Desc"
                      ? "dots_container_after_filter"
                      : "dots_container"
                  }
                >
                  <i
                    className="fa-solid fa-ellipsis-vertical"
                    onClick={() => handleDotsFilter("product_Desc")}
                  ></i>

                  {filterConditionPopup &&
                    openFilterForColoumn == "product_Desc" && (
                      <FilterConditionPopup
                        setDropDownCondition={setDropDownCondition}
                        handleFilterDropDown1={handleFilterDropDown1}
                        handleFilterDropDown2={handleFilterDropDown2}
                        dropDownCondition={dropDownCondition}
                        popup={setFilterConditionPopup}
                        clear={handleClearFilterCondition}
                        handleOperatorValue={handleOperatorValue}
                        handleFinalFilterCondition={handleFinalFilterCondition}
                        filterPopupRef={filterPopupRef}
                      />
                    )}
                </span>
              </th>
              <th scope="col">Image URL</th>
              <th
                scope="col"
                onClick={handlePriceSorting}
                style={{ cursor: "pointer", width:"7rem" }}
              >
                Price
                {showPriceArrow && 
                  <span className="price_arrow">
                  {sortPrice ? (
                    <i className="fa-solid fa-arrow-up"></i>
                  ) : (
                    <i className="fa-solid fa-arrow-down"></i>
                  )}
                </span>
                }
               
              </th>
              <th scope="col">Quantity</th>
              <th scope="col">Category</th>
              <th scope="col" style={{width:"13rem"}}>Status(
                <select className="status_select" style={selectValue=="All"?{width:"50px"}:{width:"auto"}} onChange={handleStatusSorting}>
                <option value="All" selected >All</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Pending">Pending</option>
            </select>
              )</th>
              <th scope="col">Admin's Remark</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody className="product_table_tbody">
            {(finalFilteredProducts || categoryProducts)?.length > 0 ? (
              (finalFilteredProducts || categoryProducts)
                .slice(
                  page * productPerPage - productPerPage,
                  page * productPerPage
                )
                .reverse()
                .map((item, index) => {
                  return (
                    <tr className="t_row" key={item.id}>
                      <td className="productName_col table_col">
                        {item.product_Name}
                      </td>
                      <td className="productDec_col table_col">
                        {item.product_Desc}
                      </td>
                      <td className="product_image_col table_col">
                        {item.product_Image}
                      </td>
                      <td className="product_price_col table_col">
                        {item.price}
                      </td>
                      <td className="product_quantity_col table_col">
                        {item.quantity}
                      </td>
                      <td className="product_category_col table_col">
                        {item.category}
                      </td>
                      <td className="product_status_col table_col">
                        {loginCredential?.email == "admin@gmail.com" ? (
                          <Fragment>
                            <label>{item?.status}</label>
                            <input
                              type="checkbox"
                              className="product_status_input"
                              checked={item.status == "Approved" ? true : false}
                              onClick={() => handleStatus(item)}
                            ></input>
                          </Fragment>
                        ) : (
                          <Fragment>{item.status}</Fragment>
                        )}
                      </td>
                      <td className="admin_remark_col table_col">
                      {
                        item.adminRemark ? item.adminRemark : ""
                      }
                      </td>
                      <td className="">
                        <button
                          className="btn btn-primary"
                          onClick={() => handleEditPopup(item)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  );
                })
            ) : (
              <tr>
                <td colSpan={tableColumnNumber}>
                  <div className="no_product_found_container">
                    <h1>No data Found</h1>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {createPopup && (
        <div className="create_product_popup" ref={wrapperRef}>
          <CreateProductForm
            setCreatePopup={setCreatePopup}
            contextValue={contextValue}
            setProductAdded={setProductAdded}
          />
        </div>
      )}
      {editPopup && (
        <div className="create_product_popup" ref={wrapperRef}>
          <EditForm
            setEditPopup={setEditPopup}
            editableProduct={editableProduct}
            contextValue={contextValue}
            setProductAdded={setProductAdded}
          />
        </div>
      )}

      {(finalFilteredProducts || categoryProducts)?.length > 0 && (
        <Pagination
          productsArray={
            (finalFilteredProducts || categoryProducts) ? (finalFilteredProducts || categoryProducts) : contextValue.products
          }
          page={page}
          setPage={setPage}
          productPerPage={productPerPage}
          setProductPerPage={setProductPerPage}
        />
      )}
    </div>
  );
};

export default ProductMaster;
