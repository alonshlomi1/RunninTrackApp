import React, { useState } from 'react'
import LoginForm from '../components/LoginForm';

export default function Login(props){
  const handleRegister = (e) => {
    props.setState(prev =>{
      return{
        ...prev,
        page: "register"
      }
    } )
    
  };
    return(
      <div className='form-div'>
        <LoginForm state={props.state} setState={props.setState}/>
        <div className="button-goto">
          <button onClick={handleRegister} className="link-btn">
            New user? Create new account
          </button>
        </div>
      </div>
    )
}