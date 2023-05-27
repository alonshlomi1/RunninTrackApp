import React from 'react'
import Schedule from '../components/schedule'
import Home from '../components/Home'
import AvailableForm from '../components/AvailableForm';
import Lessons from '../components/Lessons'
import Register from './register.js';

export default function Admin(props){
  // Function to render different components based on the value of props.state.page
  function renderSwitch() {
    switch(props.state.page) {
      case 'Home':
        return <Home state={props.state} setState={props.setState}/>
      case 'My Lessons':
          return <Lessons state={props.state} setState={props.setState}/>
      case 'Submit Lessons':
        return <Schedule/>
      case 'Add Available Time':
        return <AvailableForm state={props.state} setState={props.setState}/>
      case 'Instructors':
        return <Register state={props.state} setState={props.setState}/>
      default:
        return <Home state={props.state} setState={props.setState}/>
    }
  }
    return(
      <div>
        {renderSwitch()}
      </div>
    )
}