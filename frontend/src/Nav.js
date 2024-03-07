import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Nav.css"


const Nav = () => {
    const navigate=useNavigate()
    let fun=()=>{
        localStorage.clear()
        navigate("/")
    }

  return (
    <nav>
        <div>{localStorage.getItem("name")}</div>
        <button onClick={fun}>Logout</button>
    </nav>
  )
}

export default Nav