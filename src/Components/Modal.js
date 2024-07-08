import React from 'react'
import Login from '../Pages/Login'
import Register from '../Pages/Register'

const Modal = ({showPopupValue}) => {
   
    return (
        <div>
            {
                (showPopupValue) ? ((showPopupValue == "login")? <Login />: <Register />) : ''
            }
        </div>
    )
}

export default Modal
