import React, {useState} from 'react'
import Login from './pages/login.js';
import Register from './pages/register.js';
import Admin from './pages/admin.js';
import Instructor from './pages/instructor.js';
import Student from './pages/student.js';
import Header from './components/Header.js';

function App() {
  // Setting up state 
  const [state, setState] = useState({
    user: null,
    page: "Login",
    menu: ["Login", "Register"]
  })

  // Function to render different pages based on user state and type
  function renderSwitch() {
    if(state.user === null){
      return state.page === "Login"?
      <Login state={state} setState={setState}/> : <Register state={state} setState={setState}/>
    }
    switch(state.user.type) {
      case 'admin':
        return <Admin state={state} setState={setState}/>
      case 'instructor':
        return <Instructor state={state} setState={setState}/>
      case 'student':  
        return <Student state={state} setState={setState}/>
    }
  }
  // Rendering the App component
  return (
    <div className='app'>
      <header>
        <Header state={state} setState={setState} />
      </header>
      <div className='body'>
      {renderSwitch()}
      </div>
      <footer>
        <h2 className='footer'>Running Track Schedule</h2>
      </footer>
    </div>
  );

}

export default App;
