import React from 'react'
import '../Styles/Pagination.css'

const Pagination = ({productsArray, page, setPage, productPerPage, setProductPerPage}) => {

    const selectPagination =(selectedPage)=>{
        if(selectedPage>=1 && selectedPage<=Math.ceil(productsArray?.length / productPerPage) )
        setPage(selectedPage)
      }
    const handleProductPerPage = (e)=>{
      setProductPerPage(+e.target.value)
    }

    const numberArray = productsArray && [...Array(Math.ceil(productsArray?.length / productPerPage))]

    return (
        <div className="pagination_outer_container"> 
        {
            productsArray?.length>0 && 
            <div className="pagination_inner_container">
            <div className='pagination_container'>

            <span className={page >1  ? "pre_btn" : "pagination_btn_disabled" } onClick={()=>selectPagination(page-1)}>Pre</span>
            {
              numberArray?.length>0 &&
              numberArray?.map((_, i)=>{
                return <span className={(page === i+1) ? 'pagination_selected' : ''} key={i} onClick={()=>selectPagination(i+1)}>{i+1}</span>
              })
            }
            <span className={page < Math.ceil(productsArray?.length/productPerPage) ? "next_btn" : "pagination_btn_disabled" } onClick={()=>selectPagination(page+1)}>Next</span>
            
            {
              setProductPerPage &&
              <span className='productPerPage_container'>
              <select className='productPerPage_select' onChange={handleProductPerPage}>
                <option value='5'>5</option>
                <option value="10">10</option>
                <option value="10">15</option>
                <option value="10">20</option>
              </select>
              </span>
            }
            </div>
            {
              setProductPerPage &&
            <span className='product_per_page_text'>Products per page</span>
            }
            </div>
          }
          {
            numberArray?.length>0 && 
            <div className="total_products">
          {(page*productPerPage-productPerPage)+1} - {page*productPerPage>productsArray?.length? productsArray?.length : page*productPerPage} of {productsArray?.length} Products
          </div>
          }
          
        </div>
    )
}

export default Pagination
