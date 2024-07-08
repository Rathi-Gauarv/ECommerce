import React from 'react'
import { useNavigate } from 'react-router-dom'
import "../Styles/Poster.css"

const Poster = () => {

  const navigate = useNavigate()
  
  const redirectToHome = () => navigate('/')


  return (
    <div className="shop_poster_Container">
            <div className="shop_logo">
                <img className="poster_image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRRMYLaTswxDX7M_l7AG_ja01Qam1CjlNNYA&usqp=CAU" alt="" />
            </div>
            <div className="shop_details_Container">
                <div className="shop_name" onClick={redirectToHome}>SINOO</div>
                <div className="desc">Your Own Shop</div>
            </div>
        </div>
  )
}

export default Poster
