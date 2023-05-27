import React, { useState, useEffect } from 'react';
import group from '../images/group.png'
import single from '../images/single.png'
import divide from '../images/divide.png'
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function LessonsRegister(props){
    const [startDate, setStartDate] = useState(getTodayDate(0))
    const [endDate, setEndDate] = useState(getTodayDate(7))
    const [availabelLessons, setAvailabelLessons] = useState([])
    const [instructors, setInstructors] = useState([])

    function getTodayDate(n) {
      const today = new Date();
      today.setDate(today.getDate() + n);
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }

    
    async function handle_instructors(e){  

      //e.preventDefault();
      const requestUserOptions = {
        method: 'GET',
        headers: {
          'accept': "application/json",
        }
      };
    
      try {
        let response = await fetch('http://localhost:5000/instructors', requestUserOptions);
    
        if (!response.ok)
          throw new Error(response.status);
    
        response = await response.json()
        setInstructors(response.map(instructor => {
          return {id: instructor._id,
                  name: instructor.name}
        }))
      } catch (error) {
        alert(error);
      }
    }
    async function handle_table(e){
      //e.preventDefault();
      handle_instructors(e)
      const requestAvailableOptions = {
          method: 'GET',
          headers: {  'accept': "application/json"}
      };
      
      try {
          const response = await fetch('http://localhost:5000/lessons/available/'+new Date(startDate)+'/'+new Date(endDate), requestAvailableOptions);
      
          if (!response.ok)
            throw new Error(response.status);
      
          const data = await response.json();
          setAvailabelLessons(data)
        }catch (error) {
          alert(error);
        }
    }
    
    const handleRegister = async (e, lesson) => {
      e.preventDefault();
      const requestAvailableOptions = {
          method: 'PATCH',
          headers: {  'Content-Type': "application/json"},
          body: JSON.stringify({
            students: props.state.user.object
          })
      };
      
      try {
          const response = await fetch('http://localhost:5000/lessons/'+ lesson._id, requestAvailableOptions);
      
          if (!response.ok)
            throw new Error(response.status);
      
          const data = await response.json();
          alert("saved")
        }catch (error) {
          alert(error);
        }
    }
    useEffect((e) => {
      if (new Date(endDate) > new Date(startDate))
        handle_table(e)
      else
        alert("Invalid Dates")
    }, [endDate, startDate, handleRegister])
    return(
        <div className='page'>
           <div>
        <label className="label">from:</label>
        <input onChange={(e) => setStartDate(e.target.value)} className="input"
            value={startDate} type="date" />
    </div>
    <div>
        <label className="label">to:</label>
        <input onChange={(e) => setEndDate(e.target.value)} className="input"
            value={endDate} type="date" />
    </div>
        {availabelLessons.length == 0? <br/> :  <table>
            <thead>
                <tr>
                <th>Date</th>
                <th>Day</th>
                <th>Start</th>
                <th>End</th>
                <th><div className="group-logo">
                    <img src={single} alt="Logo" />
                    <img src={divide} alt="Logo" />
                    <img src={group} alt="Logo" />
                    </div></th>
                <th>Instructor</th>
                <th> </th>
                </tr>
            </thead>
            <tbody>
                {availabelLessons.map((lesson) => (
                <tr key={lesson._id}>
                    <td>{new Date(lesson.start_time).getDate()+"/"+(new Date(lesson.start_time).getMonth()+1)}</td>
                    <td>{daysOfWeek[new Date(lesson.start_time).getDay()]}</td>
                    <td>{new Date(lesson.start_time).toLocaleTimeString()}</td>
                    <td>{new Date(lesson.end_time).toLocaleTimeString()}</td>
                    <td>{lesson.is_individual?
                    <div className="group-logo">
                    <img src={single} alt="Logo" />
                    </div>:
                    <div className="group-logo">
                    <img src={group} alt="Logo" />
                    </div>}</td>
                    <td>{(instructors.filter(instructor => instructor.id === lesson.instructor)[0].name) }</td>
                    <td>
                      <button className='btn' onClick={(e) => handleRegister(e,lesson)}>
                        Register
                      </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table> }
      </div>
    )
}