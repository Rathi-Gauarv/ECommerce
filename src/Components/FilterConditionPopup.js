import React from "react";
import "../Styles/FilterConditionPopup.css";

const FilterConditionPopup = (props) => {
    const setFilterInputValues = props.setFilterInputValues
    const setDropDownCondition = props.setDropDownCondition
    const handleFilterDropDown1 = props.handleFilterDropDown1
    const handleFilterDropDown2 = props.handleFilterDropDown2
    const handleOperatorValue = props.handleOperatorValue
    const filterInputValues = props.filterInputValues
    const dropDownCondition = props.dropDownCondition
    const handleFinalFilterCondition = props.handleFinalFilterCondition
    const filterPopupRef = props.filterPopupRef
    const clear = props.clear

    // const handleOnChange = (e)=>{
    //     setFilterInputValues({...filterInputValues, [e.target.name]: e.target.value})
    // }
    const handleDropDownValue = (e)=>{
        setDropDownCondition({...dropDownCondition, [e.target.name]: e.target.value})
    }
    
  return (
    <div className="filter_condition_main_container" ref={filterPopupRef}>
      <div className="inner_filter_condition_container">
        <div className="filter_icon_text_container">
          <span className="filter_icon_span">
            <i className="fa-sharp fa-solid fa-filter"></i>
          </span>
          <span className="filter_text_span">Filter</span>
        </div>
      <div className="mb-2">
        <div className="dropDwon1_container mb-2">
            <select className="form-select form-select-lg" name="dropDownvalue1" onChange={handleDropDownValue}>
                <option value="Contains" selected>Contains</option>
                <option value="Does not contain">Does not contain</option>
                <option value="Is equal to">Is equal to</option>
                <option value="Is not equal to">Is not equal to</option>
                <option value="Starts with">Starts with</option>
                <option value="Ends with">Ends with</option>
            </select>
            <div className="col-8 w-100 mt-1" style={{ marginBottom: "10px" }}>
              <input
                type="text"
                className="form-control"
                name="dropdown1_input"
                placeholder=""
                onChange={(e)=>{
                    // handleOnChange(e)
                    handleFilterDropDown1(e)
                }}
              />
            </div>
        </div>
        <div className="operator_container mb-2 w-50">
        <select className="form-select form-select-lg"  onChange={handleOperatorValue}>
                <option value="And" selected>And</option>
                <option value="Or">Or</option>
                
            </select>
        </div>
        <div className="dropDwon2_container mb-2">
            <select className="form-select form-select-lg" name="dropDownvalue2" onChange={handleDropDownValue}>
                <option value="Contains" selected>Contains</option>
                <option value="Does not contain">Does not contain</option>
                <option value="Is equal to">Is equal to</option>
                <option value="Is not equal to">Is not equal to</option>
                <option value="Starts with">Starts with</option>
                <option value="Ends with">Ends with</option>
            </select>
            <div className="col-8 w-100 mt-1" style={{ marginBottom: "10px" }}>
              <input
                type="text"
                className="form-control"
                name="dropdown2_input"
                placeholder=""
                onChange={(e)=>{
                    // handleOnChange(e)
                    handleFilterDropDown2(e)
                }}
              />
            </div>
        </div>
        </div>
       
        <div className="Btn_contianer">
        <button className="btn btn border filter_clear_btn clear_btn" onClick={clear} >Clear</button>
        <button  className="btn btn-primary filter_clear_btn" onClick={handleFinalFilterCondition} >Filter</button>
        </div>
        
       
        
      </div>
    </div>
  );
};

export default FilterConditionPopup;
