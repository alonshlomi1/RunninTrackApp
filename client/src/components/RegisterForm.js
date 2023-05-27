import React, { useState } from 'react';

export default function RegisterForm(props ){
    const [name, setName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // States for checking the errors
    
    // Handling the name change
    const handleName = (e) => {
        setName(e.target.value);
    };
    // Handling the birthday change
    const handleBirthday = (e) => {
        setBirthday(e.target.value);
    };
    // Handling the gender change
    const handleGender = (e) => {
        setGender(e.target.value);
    };
    
    // Handling the email change
    const handleEmail = (e) => {
        setEmail(e.target.value);
    };
    
    // Handling the password change
    const handlePassword = (e) => {
        setPassword(e.target.value);
    };
    
    // Handling the form submission
    async function handleSubmit(e) {
        e.preventDefault();
      
        const requestStudentOptions = {
          method: 'POST',
          headers: {
            'accept': "application/json",
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: name,
            birthdate: birthday,
            gender: gender
          })
        };
        try {
          console.log('http://18.134.144.102:5000/'+(props.state.user == null? "students": "instructors"))
          let response
          if(props.state.user === null){
            response = await fetch('http://18.134.144.102:5000/students', requestStudentOptions);
          }
          else{
            response = await fetch('http://18.134.144.102:5000/instructors', requestStudentOptions);
          }
          
      
          if (!response.ok)
            throw new Error(response.status);
      
          const data = await response.json();
      
          props.setState(prev => {
            return {
              ...prev,
              student: data
            };
          });
      
          const requestUserOptions = {
            method: 'POST',
            headers: {
              'accept': "application/json",
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: email,
              password: password,
              type: props.state.user == null? "student": "instructor",
              object: data._id
            })
          };
      
          const userResponse = await fetch('http://18.134.144.102:5000/users', requestUserOptions);
      
          if (!userResponse.ok)
            throw new Error(userResponse.status);
      
          const userData = await userResponse.json();
          if(props.state.user === null){
            props.setState(prev => {
              return {
                ...prev,
                user: userData,
                menu: userData.type==="admin"?["Home","My Lessons","Submit Lessons","Add Available Time","Instructors"]:userData.type=="instructor"?["Home","My Lessons","Add Available Time","Edit Available Time"]:["Home","My Lessons","Lesson Register"],
                page: "Home"
              }
            });
          }
          else{
            alert("Saved")
          }
          
        } catch (error) {
          alert(error);
        }
      }
    return(
    <div>
        <div>
                <h3>New {props.state.user == null? "student": "instructor"} Registration</h3>
            </div>
            <form>
                <div>
                    <label className="label">Name</label>
                    <input onChange={handleName} className="input"
                        value={name} type="text" />
                </div>
                <div>
                    <label className="label">Birthday</label>
                    <input onChange={handleBirthday} className="input"
                        value={birthday} type="date" />
                </div>
                <div>
                    <label className="label">Gender</label>
                    <select onChange={handleGender} value={gender}>
                        <option>Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div>
                    <label className="label">Email</label>
                    <input onChange={handleEmail} className="input"
                        value={email} type="email" />
                </div> 
                <div>
                    <label className="label">Password</label>
                    <input onChange={handlePassword} className="input"
                        value={password} type="password" />
                </div>                             
                <button onClick={handleSubmit} className="btn"
                disabled={(name === '' || email === '' || password === '')}
                        type="submit">
                    Submit
                </button>
            </form>
        </div>
    )
}