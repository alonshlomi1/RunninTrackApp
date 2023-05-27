import React, { useState } from 'react';

export default function LoginForm(props){
const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestLoginOptions = {
        method: 'POST',
        headers: {  'accept': "application/json",
                    'Content-Type': 'application/json'},
        body: JSON.stringify({ email: email,
                               password: password})
    };
    try {
        const response = await fetch('http://18.134.144.102:5000/users/login', requestLoginOptions);
    
        if (!response.ok)
          throw new Error(response.status);
    
        const data = await response.json();
    
        props.setState(prev => {
          return {
            ...prev,
            user: data,
            menu: data.type=="admin"?["Home","My Lessons","Submit Lessons","Add Available Time","Instructors"]:data.type=="instructor"?["Home","My Lessons","Add Available Time","Edit Available Time"]:["Home","My Lessons","Lesson Register"],
            page: "Home"
          };
        });
      }catch (error) {
        alert(error);
      }

  };
  

    return(
    <div className="form">
        <form>
          <div className="input-container">
            <label>Email </label>
            <input onChange={handleEmail} className="input"
                        value={email} type="email" />
          </div>
          <div className="input-container">
            <label>Password </label>
            <input onChange={handlePassword} className="input"
                        value={password} type="password" />
          </div>
          <div className="button-container">
          <button onClick={handleSubmit} className="btn"
                disabled={(email === '' || password === '')}
                        type="submit">
                    Submit
          </button>
          </div>
        </form>
        
      </div>
    )   
}