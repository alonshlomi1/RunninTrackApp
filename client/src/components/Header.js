import React from 'react';
import logo from '../images/running.png'

export default function Header(props){
  return(
    <div className='navbar'>
      <div className="navbar-logo">
      <img src={logo} alt="Logo" />
      </div>
        {props.state.menu.map(option => {
            return <button className='navbar_button' key={option} onClick={() => props.setState(prev => {
               return{ ...prev,
                page: option}
            })}>
                {option}
            </button>
        })}
        {props.state.user!==null? <button className='logout' onClick={() => props.setState({
    user: null,
    page: "Login",
    menu: ["Login", "Register"]
  })}>Logout</button>:''}
    </div>
  )
}