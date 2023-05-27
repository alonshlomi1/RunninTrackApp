import React from 'react';
import LessonsRegister from '../components/LessonsRegister';
import Lessons from '../components/Lessons'
import Home from '../components/Home'


export default function Student(props){
    function renderSwitch() {
      switch(props.state.page) {
        case 'Home':
          return <Home state={props.state} setState={props.setState}/>
        case 'My Lessons':
          return <Lessons state={props.state} setState={props.setState}/>
        case 'Lesson Register':
          return <LessonsRegister state={props.state} setState={props.setState}/>
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