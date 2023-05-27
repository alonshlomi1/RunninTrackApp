import React, { useState } from 'react';
import AvailableTable from '../components/AvailableTable';
import AvailableForm from '../components/AvailableForm';
import Lessons from '../components/Lessons'
import Home from '../components/Home'

export default function Instructor(props){
  // Function to render different components based on the value of props.state.page
    function renderSwitch() {
      switch(props.state.page) {
        case 'Home':
          return <Home state={props.state} setState={props.setState}/>
          case 'My Lessons':
            return <Lessons state={props.state} setState={props.setState}/>
        case 'Add Available Time':
          return <AvailableForm state={props.state} setState={props.setState}/>
        case 'Edit Available Time':
          return <AvailableTable state={props.state} setState={props.setState}/>
      }
    }
      return(
        <div>
          {renderSwitch()}
        </div>
      )
}