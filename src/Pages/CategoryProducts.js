import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import SingleProduct from "../Components/SingleProduct";
import { AllProducts } from "../Routers";
import Pagination from "../Components/Pagination";
import { useLocation } from "react-router";
import "../Styles/CategoryProducts.css";

const CategoryProducts = () => {
  const contextValue = useContext(AllProducts);
  const [searchValue, setSearchValue] = useState("");
  let [searchedProducts, setSearchedProducts] = useState(null);
  const [sideFilterMenu, setSideFilterMenu] = useState(false);
  const [product_Name_Array, setProduct_Name_Array] = useState([]);
  // const [checkbox, setCheckbox] = useState({
  //   id: "",
  //   checked: false,
  // });
  const [checkbox, setCheckbox] = useState([]);
  const [dropdown, setDropdown] = useState({
    product_Name: true,
    price_Range: true,
  });
  let [filteredbyName, setFilteredbyName] = useState(null);
  let [filteredbyPrice, setFilteredbyPrice] = useState(null);
  const [productsOnScreen, setProductsOnScreen] = useState(null);
  const [page, setPage] = useState(1);
  const productPerPage = 6;

  const location = useLocation();

  // -------------------------Search Bar---------------------------
  const handleSearchValue = (e) => {
    console.log("e", e);
    setSearchValue(e.target.value);
    // handleSearchFilteredProducts(e.target.value);
  };

  const handleSearchFilteredProducts = () => {
    const SV = searchValue;

    if (!SV) {
      return;
    }

    // const selectedCheckbox = document.getElementsByClassName('subItems_checkbox')
    // for(let i=0; i<selectedCheckbox.length; i++){
    // selectedCheckbox[i].setAttribute('checked', '')
    // }

    //const filteredProducts = [...contextValue.products].filter(item=>item.product_Name.toLowerCase().includes(searchValue.toLowerCase()) || item.product_Desc.toLowerCase().includes(searchValue.toLowerCase()) )
    console.log(
      "location?.state?.categoryProducts",
      location?.state?.categoryProducts
    );
    const filteredProducts = [...location?.state?.categoryProducts]?.filter(
      (item) =>
        item?.product_Name?.toLowerCase()?.includes(SV?.toLowerCase()) ||
        item?.product_Desc?.toLowerCase()?.includes(SV?.toLowerCase())
    );
    console.log("filteredProducts", filteredProducts);
    setSearchedProducts(filteredProducts);

    setProductsOnScreen(filteredProducts);
  };
  const handleClearSearch = () => {
    setSearchValue("");
    setSearchedProducts(null);
    setProductsOnScreen(location?.state?.categoryProducts);
  };

  // -------------------------Filter Product Name---------------------
  // const handleFilterProductName = (productItem) => {
  //   const checkboxInput = document.getElementById(
  //     `${productItem.product_Name}_checkbox${productItem.id}`
  //   );
  //   console.log("checkboxInput", checkboxInput);
  //   console.log("checkboxInput", checkboxInput.checked);
  //   if (checkbox.length > 0) {
  //     const checkboxIndex = checkbox?.findIndex(
  //       (item) =>
  //         item.id == `${productItem.product_Name}_checkbox${productItem.id}`
  //     );
  //     const checkboxItem = checkbox?.find(
  //       (item) =>
  //         item.id == `${productItem.product_Name}_checkbox${productItem.id}`
  //     );
  //     console.log("checkboxItem", checkboxItem);

  //     if (checkboxItem) {
  //       const cloneObject = { ...checkbox[checkboxIndex] };
  //       if (checkboxInput.checked) {
  //         cloneObject.checked = true;
  //         const filteredProducts = location.state.categoryProducts?.find(
  //           (item) => item?.id == productItem.id
  //         );
  //         const alreadyExist = searchedProducts?.some(
  //           (item) => item.id != filteredProducts.id
  //         );
  //         if (alreadyExist) {
  //           setSearchedProducts([...searchedProducts, filteredProducts]);
  //         }
  //       } else {
  //         cloneObject.checked = false;
  //           const productIndex = searchedProducts?.findIndex(
  //             (item) => item?.id == productItem.id
  //           );
  //           if (productIndex !== -1) {
  //             searchedProducts.splice(productIndex, 1);
  //             setSearchedProducts([...searchedProducts]);
  //           }
  //       }
  //       checkbox.splice(checkboxIndex, 1, cloneObject);
  //       setCheckbox([...checkbox]);
  //     } else {
  //       const checkboxObject = {
  //         id: `${productItem.product_Name}_checkbox${productItem.id}`,
  //         checked: true,
  //       };
  //       setCheckbox([...checkbox, checkboxObject]);
  //       const filteredProducts = location.state.categoryProducts?.find(
  //         (item) => item?.id == productItem.id
  //       );
  //       const alreadyExist = searchedProducts.some(
  //         (item) => item.id != filteredProducts.id
  //       );
  //       if (alreadyExist) {
  //         setSearchedProducts([...searchedProducts, filteredProducts]);
  //       }
  //     }
  //   } else {
  //     const checkboxObject = {
  //       id: `${productItem.product_Name}_checkbox${productItem.id}`,
  //       checked: true,
  //     };
  //     setCheckbox([...checkbox, checkboxObject]);
  //     const filteredProducts = location.state.categoryProducts?.find(
  //       (item) => item?.id == productItem.id
  //     );
  //     console.log("filteredProducts", filteredProducts);
  //     console.log("first filter product");
  //     setSearchedProducts([filteredProducts]);
  //   }

  //   // handleClearall(`${pName}_checkbox`);
  //   console.log("checkbox", checkbox);
  //   console.log("function called");
  // };

  const handleFilterProductName = (productItem) => {
    const checkboxInput = document.getElementById(
      `${productItem.product_Name}_checkbox${productItem.id}`
    );
    let productsForNameFilter = "";
    if (!filteredbyPrice) {
      productsForNameFilter = location.state.categoryProducts
        ? location.state.categoryProducts
        : [];
    } else {
      productsForNameFilter = filteredbyPrice
        ? [...filteredbyPrice]
        : [...location.state.categoryProducts];
    }
    console.log("filteredbyPrice", filteredbyPrice);
    console.log("productsForNameFilter", productsForNameFilter);

    if (checkboxInput?.checked) {
      if (checkbox?.length > 0) {
        const checkboxIndex = checkbox?.findIndex(
          (item) =>
            item.id == `${productItem?.product_Name}_checkbox${productItem?.id}`
        );
        const checkboxItem = checkbox?.find(
          (item) =>
            item.id == `${productItem?.product_Name}_checkbox${productItem?.id}`
        );
        if (checkboxItem) {
          checkboxItem.checked = true;
          checkbox.splice(checkboxIndex, 1, checkboxItem);
          setCheckbox([...checkbox]);
        } else {
          const checkboxObject = {
            id: `${productItem.product_Name}_checkbox${productItem.id}`,
            checked: true,
          };
          setCheckbox([...checkbox, checkboxObject]);
        }
        // const filteredProducts = location.state.categoryProducts?.find(
        const filteredProducts = productsForNameFilter?.filter(
          (item) => item?.id == productItem.id
        );
        if (filteredProducts?.length > 0) {
          if (searchedProducts?.lemgth > 0) {
            if (filteredbyPrice) {
              setFilteredbyName([...filteredProducts]);
              setSearchedProducts([...filteredProducts]);
            } else {
              setFilteredbyName([...searchedProducts, ...filteredProducts]);
              setSearchedProducts([...searchedProducts, ...filteredProducts]);
            }
          } else {
            setFilteredbyName([...filteredProducts]);
            setSearchedProducts([...filteredProducts]);
          }
        } else {
          if (searchedProducts?.length > 0) {
            if (filteredbyPrice) {
              setFilteredbyName([]);
              setSearchedProducts([]);
            } else {
              setFilteredbyName(searchedProducts);
              setSearchedProducts(searchedProducts);
            }
          } else {
            setFilteredbyName([]);
            setSearchedProducts([]);
          }
        }
      } else {
        const checkboxObject = {
          id: `${productItem.product_Name}_checkbox${productItem.id}`,
          checked: true,
        };
        setCheckbox([checkboxObject]);

        // const filteredProducts = location.state.categoryProducts?.find(
        const filteredProducts = productsForNameFilter?.filter(
          (item) => item?.id == productItem.id
        );
        if (filteredProducts?.length > 0) {
          if (searchedProducts?.length > 0) {
            if (filteredbyPrice) {
              setFilteredbyName([...filteredProducts]);
              setSearchedProducts([...filteredProducts]);
            } else {
              setFilteredbyName([...searchedProducts, ...filteredProducts]);
              setSearchedProducts([...searchedProducts, ...filteredProducts]);
            }
          } else {
            setFilteredbyName([...filteredProducts]);
            setSearchedProducts([...filteredProducts]);
          }
        } else {
          if (searchedProducts?.length > 0) {
            if (filteredbyPrice) {
              setFilteredbyName([]);
              setSearchedProducts([]);
            } else {
              setFilteredbyName(searchedProducts);
              setSearchedProducts(searchedProducts);
            }
          } else {
            setFilteredbyName([]);
            setSearchedProducts([]);
          }
        }
      }
    } else {
      if (checkbox?.length > 0) {
        const checkboxIndex = checkbox?.findIndex(
          (item) =>
            item.id == `${productItem?.product_Name}_checkbox${productItem?.id}`
        );
        const checkboxItem = checkbox?.find(
          (item) =>
            item.id == `${productItem?.product_Name}_checkbox${productItem?.id}`
        );
        if (checkboxItem) {
          checkboxItem.checked = false;
          checkbox.splice(checkboxIndex, 1, checkboxItem);
          setCheckbox([...checkbox]);
        }
        if (searchedProducts?.length > 0) {
          for (let i = 0; i <= searchedProducts?.length; i++) {
            const productIndex = searchedProducts?.findIndex(
              (item) => item?.id == productItem?.id
            );
            if (productIndex != -1) {
              searchedProducts?.splice(productIndex, 1);
            }
          }
          if (filteredbyName?.length > 0) {
            for (let i = 0; i <= filteredbyName?.length; i++) {
              const productIndex = filteredbyName?.findIndex(
                (item) => item?.id == productItem?.id
              );
              if (productIndex != -1) {
                filteredbyName?.splice(productIndex, 1);
              }
            }
          }
          if (filteredbyName?.length == 0) {
            filteredbyName = null;
          }
          setFilteredbyName(filteredbyName);
          setSearchedProducts(searchedProducts);
        }
      }
    }
  };

  // ----------------------------Filter Item DropDown----------------------
  const handledropdown = (e) =>
    setDropdown({ ...dropdown, [e.target.id]: !dropdown[e.target.id] });

  // --------------------Filter Price-------------------------------
  const handleFilterPriceRange = (e, low, high = null) => {
    let checkboxInput = "";
    let productsForPriceFilter = "";
    if (!filteredbyName) {
      productsForPriceFilter = location?.state?.categoryProducts
        ? location?.state?.categoryProducts
        : [];
    } else {
      productsForPriceFilter = filteredbyName
        ? [...filteredbyName]
        : [...location.state.categoryProducts];
    }
    console.log("filteredbyName", filteredbyName);
    console.log("productsForPriceFilter", productsForPriceFilter);

    if (e.target.id == "Below_10000") {
      checkboxInput = document.getElementById(e.target.id);
    } else if (e.target.id == "Above_5000") {
      checkboxInput = document.getElementById(e.target.id);
    } else {
      checkboxInput = document.getElementById(e.target.id);
    }

    if (checkboxInput?.checked) {
      if (checkbox?.length > 0) {
        const checkboxIndex = checkbox?.findIndex(
          (item) => item.id == e.target.id
        );
        const checkboxItem = checkbox?.find((item) => item.id == e.target.id);
        if (checkboxItem) {
          checkboxItem.checked = true;
          checkbox.splice(checkboxIndex, 1, checkboxItem);
          setCheckbox([...checkbox]);
        } else {
          const checkboxObject = {
            id: e.target.id,
            checked: true,
          };
          setCheckbox([...checkbox, checkboxObject]);
        }

        let filteredProducts = [];
        if (high == null) {
          // filteredProducts = location.state.categoryProducts.filter(
          filteredProducts = productsForPriceFilter?.filter(
            (item) => Number(item.price) >= low
          );
        } else {
          // filteredProducts = location.state.categoryProducts.filter(
          filteredProducts = productsForPriceFilter.filter(
            (item) => Number(item.price) >= low && Number(item.price) < high
          );
        }
        console.log("filteredProducts under price", filteredProducts);

        if (filteredProducts?.length > 0) {
          if (searchedProducts?.length > 0) {
            if (filteredbyName) {
              setFilteredbyPrice([...filteredProducts]);
              setSearchedProducts([...filteredProducts]);
            } else {
              setFilteredbyPrice([...searchedProducts, ...filteredProducts]);
              setSearchedProducts([...searchedProducts, ...filteredProducts]);
            }
          } else {
            setFilteredbyPrice([...filteredProducts]);
            setSearchedProducts([...filteredProducts]);
          }
        } else {
          if (searchedProducts?.length > 0) {
            if (filteredbyName) {
              setFilteredbyPrice([]);
              setSearchedProducts([]);
            } else {
              setFilteredbyPrice(searchedProducts);
              setSearchedProducts(searchedProducts);
            }
          } else {
            setFilteredbyPrice([]);
            setSearchedProducts([]);
          }
        }
      } else {
        const checkboxObject = {
          id: e.target.id,
          checked: true,
        };
        setCheckbox([checkboxObject]);

        let filteredProducts = [];
        if (high == null) {
          // filteredProducts = location.state.categoryProducts.filter(
          filteredProducts = productsForPriceFilter.filter(
            (item) => Number(item.price) >= low
          );
        } else {
          // filteredProducts = location.state.categoryProducts.filter(
          filteredProducts = productsForPriceFilter.filter(
            (item) => Number(item.price) >= low && Number(item.price) < high
          );
        }

        if (filteredProducts?.length > 0) {
          if (searchedProducts?.length > 0) {
            if (filteredbyName) {
              setFilteredbyPrice([...filteredProducts]);
              setSearchedProducts([...filteredProducts]);
            } else {
              setFilteredbyPrice([...searchedProducts, ...filteredProducts]);
              setSearchedProducts([...searchedProducts, ...filteredProducts]);
            }
          } else {
            setFilteredbyPrice([...filteredProducts]);
            setSearchedProducts([...filteredProducts]);
          }
        } else {
          if (searchedProducts?.length > 0) {
            if (filteredbyName) {
              setFilteredbyPrice([]);
              setSearchedProducts([]);
            } else {
              setFilteredbyPrice(searchedProducts);
              setSearchedProducts(searchedProducts);
            }
          } else {
            setFilteredbyPrice([]);
            setSearchedProducts([]);
          }
        }
      }
    } else {
      if (checkbox.length > 0) {
        const checkboxIndex = checkbox?.findIndex(
          (item) => item.id == e.target.id
        );
        const checkboxItem = checkbox?.find((item) => item.id == e.target.id);
        if (checkboxItem) {
          checkboxItem.checked = false;
          checkbox.splice(checkboxIndex, 1, checkboxItem);
          setCheckbox([...checkbox]);
        }
        if (searchedProducts?.length > 0) {
          let filteredProducts = [];
          if (high == null) {
            // filteredProducts = location.state.categoryProducts.filter(
            filteredProducts = productsForPriceFilter.filter(
              (item) => Number(item.price) >= low
            );
          } else {
            // filteredProducts = location.state.categoryProducts.filter(
            filteredProducts = productsForPriceFilter.filter(
              (item) => Number(item.price) >= low && Number(item.price) < high
            );
          }

          for (let i = 0; i < filteredProducts?.length; i++) {
            const productIndex = searchedProducts.findIndex(
              (item) => item?.id == filteredProducts[i]?.id
            );
            if (productIndex != -1) {
              searchedProducts.splice(productIndex, 1);
            }
          }
          if (filteredbyPrice?.length > 0) {
            for (let i = 0; i < filteredbyPrice?.length; i++) {
              const productIndex = filteredbyPrice.findIndex(
                (item) => item?.id == filteredProducts[i]?.id
              );
              if (productIndex != -1) {
                filteredbyPrice.splice(productIndex, 1);
              }
            }
          }

          if (filteredbyPrice?.length == 0) {
            filteredbyPrice = null;
          }

          setFilteredbyPrice(filteredbyPrice);

          setSearchedProducts(searchedProducts);
        }
      }
    }

    // if (checkboxInput && checkboxInput.checked) {
    //   if (high == null) {
    //     const filteredProducts = location.state.categoryProducts.filter(
    //       (item) => Number(item.price) >= low
    //     );
    //     setSearchedProducts([...searchedProducts, ...filteredProducts]);
    //   } else {
    //     const filteredProducts = location.state.categoryProducts.filter(
    //       (item) => Number(item.price) >= low && Number(item.price) < high
    //     );
    //     setSearchedProducts([...searchedProducts, ...filteredProducts]);
    //   }
    //   if (checkboxInput.checked) {
    //     setCheckbox({ id: `${e.target.id}`, checked: true });
    //   }
    // } else {
    //   setSearchedProducts([]);
    // }
  };

  // -------------------Array(List) of Product Name--------------------
  // const getProductNameArray = () => {
  //   let temp = [];
  //   for (let i = 0; i < contextValue?.products?.length; i++) {
  //     temp.push(contextValue?.products[i]?.product_Name);
  //   }
  //   setProduct_Name_Array(temp);
  // };

  // ------------------------OutSide Click----------------------------
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setSideFilterMenu(false);
          // setDropdown({ product_Name: false, price_Range: false });
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  // -------------------------Clearall Filter---------------------

  function handleClearall(label_id) {
    const checkedValue = document.querySelectorAll(".subItems_checkbox");

    if (checkedValue?.length > 0) {
      for (let i = 0; i < checkedValue?.length; i++) {
        checkedValue[i].checked = false;
      }
    }
    setCheckbox([]);
    setSearchedProducts(null);
    setFilteredbyName(null);
    setFilteredbyPrice(null);
    setProductsOnScreen(location?.state?.categoryProducts);
  }

  // -------------------------------useEffect-----------------------------

  // useEffect(() => {
  //   getProductNameArray();
  // }, [sideFilterMenu]);

  useEffect(() => {
    const checkedValue = document.querySelectorAll(".subItems_checkbox");

    if (checkbox.length > 0) {
      for (let i = 0; i < checkedValue.length; i++) {
        for (let j = 0; j < checkbox.length; j++) {
          if (checkbox[j].checked) {
            const selectedCheckbox = document.getElementById(
              `${checkbox[j].id}`
            );
            selectedCheckbox && selectedCheckbox.setAttribute("checked", "");
          } else {
            const selectedCheckbox = document.getElementById(
              `${checkbox[j].id}`
            );
            selectedCheckbox && selectedCheckbox.removeAttribute("checked");
          }
        }
      }
    }
  }, [dropdown, sideFilterMenu]);

  useEffect(() => {
    if (!searchedProducts) {
      setProductsOnScreen(location?.state?.categoryProducts);
    } else {
      var _ = require("lodash");
      let newObject = _.uniqWith(searchedProducts, _.isEqual);
      setProductsOnScreen(newObject);
    }
  }, [checkbox]);

  console.log("searchedProducts", searchedProducts);
  console.log("productsOnScreen", productsOnScreen);

  return (
    <div className="main_categoryProducts_container">
      <div className="searchbar_filtermenu_container">
        <div className="filter_icon_menu_container" ref={wrapperRef}>
          <div
            className={
              sideFilterMenu ? "filter_icon_open" : "filter_icon_container"
            }
          >
            <span
              className="filter_icon"
              onClick={() => setSideFilterMenu((prev) => !prev)}
            >
              {searchedProducts?.length > 0 ? (
                <i
                  className="fa-solid fa-filter"
                  style={{ color: "#eb0f0f" }}
                ></i>
              ) : (
                <i className="fa-solid fa-filter"></i>
              )}
            </span>
          </div>
          {sideFilterMenu && (
            <div className="filterMenu_container">
              <div className="filterMenu_items_container">
                <div className="filter_clearAll_container">
                  <div className="filter_heading">Filter</div>
                  <div
                    className="clear_all_heading"
                    onClick={() => handleClearall(null)}
                  >
                    Clear all
                  </div>
                </div>
                <div className="filterMenu_item">
                  <div
                    className="filterMenu_item_heading"
                    id="product_Name"
                    onClick={handledropdown}
                  >
                    <span>Product Name</span>
                    {dropdown.product_Name ? "-" : "+"}
                  </div>
                  {dropdown.product_Name && (
                    <div className="filterMenu_item_subHeading_container">
                      {contextValue?.products?.length > 0 &&
                        contextValue?.products?.map((item, i) => {
                          return (
                            <div
                              className="items_subHeading"
                              key={i}
                              onClick={() => handleFilterProductName(item)}
                            >
                              <label
                                htmlFor={`${item.product_Name}_checkbox${item.id}`}
                              >
                                <input
                                  type="checkbox"
                                  className={`subItems_checkbox checkbox_${item.product_Name}${i}`}
                                  id={`${item.product_Name}_checkbox${item.id}`}
                                  value={item.product_Name}
                                  name="ProductName"
                                />
                                {item.product_Name}
                              </label>
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>
                <div className="filterMenu_item">
                  <div
                    className="filterMenu_item_heading"
                    id="price_Range"
                    onClick={handledropdown}
                  >
                    <span>Price Range</span>
                    {dropdown.price_Range ? "-" : "+"}
                  </div>
                  {dropdown.price_Range && (
                    <div className="filterMenu_item_subHeading_container">
                      <div
                        className="items_subHeading"
                        onClick={(e) => handleFilterPriceRange(e, 0, 10000)}
                      >
                        <label htmlFor="Below_10000">
                          <input
                            type="checkbox"
                            className="subItems_checkbox"
                            id="Below_10000"
                          />
                          Below 10000
                        </label>
                      </div>
                      <div
                        className="items_subHeading"
                        onClick={(e) => handleFilterPriceRange(e, 10000, 20000)}
                      >
                        <label htmlFor="10000_20000">
                          <input
                            type="checkbox"
                            className="subItems_checkbox"
                            id="10000_20000"
                          />
                          10000 - 20000
                        </label>
                      </div>
                      <div
                        className="items_subHeading"
                        onClick={(e) => handleFilterPriceRange(e, 20000, 30000)}
                      >
                        <label htmlFor="20000_30000">
                          <input
                            type="checkbox"
                            className="subItems_checkbox"
                            id="20000_30000"
                          />
                          20000 - 30000
                        </label>
                      </div>
                      <div
                        className="items_subHeading"
                        onClick={(e) => handleFilterPriceRange(e, 30000, 40000)}
                      >
                        <label htmlFor="30000_40000">
                          <input
                            type="checkbox"
                            className="subItems_checkbox"
                            id="30000_40000"
                          />
                          30000 - 40000
                        </label>
                      </div>
                      <div
                        className="items_subHeading"
                        onClick={(e) => handleFilterPriceRange(e, 40000, 50000)}
                      >
                        <label htmlFor="40000_50000">
                          <input
                            type="checkbox"
                            className="subItems_checkbox"
                            id="40000_50000"
                          />
                          40000 - 50000
                        </label>
                      </div>
                      <div
                        className="items_subHeading"
                        onClick={(e) => handleFilterPriceRange(e, 50000)}
                      >
                        <label htmlFor="Above_50000">
                          <input
                            type="checkbox"
                            className="subItems_checkbox"
                            id="Above_50000"
                          />
                          Above 50000
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="searchbar_container">
          <input
            className="searchbar_input"
            type="text"
            placeholder="Search here"
            value={searchValue}
            onChange={handleSearchValue}
          />
          {!!searchValue && (
            <i
              className="fa-solid fa-x search_cross_icon"
              onClick={handleClearSearch}
            />
          )}

          <i
            className="fa-solid fa-magnifying-glass search_icon"
            onClick={handleSearchFilteredProducts}
          />
        </div>
      </div>

      <div className="inner_categoryProducts_container">
        {productsOnScreen?.length > 0 ? (
          productsOnScreen
            .slice(
              page * productPerPage - productPerPage,
              page * productPerPage
            )
            .map((item, i) => {
              return (
                <Fragment key={i}>
                  <SingleProduct item={item} />
                </Fragment>
              );
            })
        ) : (
          <div className="no_product_found_container">
            <h1> No Product Found</h1>
          </div>
        )}
      </div>

      <div style={{ width: "90%", marginBottom: "40px" }}>
        <Pagination
          productsArray={productsOnScreen || location.state.categoryProducts}
          page={page}
          setPage={setPage}
          productPerPage={productPerPage}
        />
      </div>
    </div>
  );
};

export default CategoryProducts;
