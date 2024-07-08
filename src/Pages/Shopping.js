import React, { Fragment, useContext, useEffect, useRef, useState } from "react";
import "../Styles/Shopping.css";
import SingleProduct from "../Components/SingleProduct";
import { AllProducts } from "../Routers";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router";

const Shopping = () => {
  const contextValue = useContext(AllProducts);
  const [newCategoryViseData, setNewCategoryViseData] = useState([]);
  const navigate = useNavigate();


  // ---------------------------Structure Data acc to category-----------------
  const getCategoryDataArray = () => {
    const approvedProductsList = contextValue?.products?.filter(item => item.status == "Approved")
    let finalObj = {};
    if (approvedProductsList?.length > 0) {
      approvedProductsList?.forEach((item) => {
        if (finalObj[item?.category]) {
          finalObj[item?.category]?.push(item);
        } else {
          finalObj[item?.category] = [item];
        }
      });

      let temp = [];
      Object.keys(finalObj)?.map((category) => {
        temp?.push({
          new_category: category,
          category_data: [...finalObj[category]],
        });
      });
      setNewCategoryViseData([...temp]);
    }
  };

  // ------------------------OutSide Click----------------------------
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }



//  -----------------------------Carousel-------------------------
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1310 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1310, min: 1100 },
      items: 3,
    },
    laptop: {
      breakpoint: { max: 1100, min: 1000 },
      items: 2,
    },
    larger_tablet: {
      breakpoint: { max: 1000, min: 800 },
      items: 2,
    },
    large_tablet: {
      breakpoint: { max: 800, min: 700 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 700, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  // --------------------ViewAll----------------

  const handleViewAll = (item)=>{
    navigate(`/${item.new_category}`, {state:{categoryProducts: item.category_data}})
  }

   //  --------------------------useEffect------------------

   useEffect(() => {
    getCategoryDataArray();
  }, [contextValue]);

  console.log("newCategoryViseData", newCategoryViseData)
  console.log("contextValue", contextValue)



  return (
    <div className="main_section_container">
      <div className="inner_container">
        {!!newCategoryViseData && newCategoryViseData?.length > 0 ? (
          newCategoryViseData?.map((item, i) => {
            return (
              <div className="category_product_container" id={i} key={i}>
                <div className="categoryName_container">
                  {item.new_category.toUpperCase()}
                  <span  className='viewall' onClick={()=>handleViewAll(item)}>View All</span>
                </div>
                <div className='product_slider_container'>
                  <Carousel
                    // showDots={true}
                    responsive={responsive}
                    className="product_Slider"
                  >
                    {item.category_data.map((product, index) => {
                      return (
                        <div className="single_product_container" key={index}>
                        <SingleProduct item={product} />
                      </div>
                      );
                    })}
                  </Carousel>
                </div>
              </div>
            );
          })
        ) : (
          <div className="no_product_found_container">
            <h1> No Product Found</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shopping;
