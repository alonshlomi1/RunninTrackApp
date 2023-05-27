import React from 'react'
import RegisterForm from '../components/RegisterForm';

export default function Register(props){
// handle the login button click event
const handleLogin = (e) => {
    props.setState(prev =>{
      return{
        ...prev,
        page: "Login"
      }
    } )
}
    return(
        <div className='form-div'>
            <RegisterForm state={props.state} setState={props.setState}/>
            <div className="button-goto">
            {props.state.user == null? <button onClick={handleLogin} className="link-btn">
                Already have an account? Login
                </button>: ""}
                
            </div>
        </div>
    )
}