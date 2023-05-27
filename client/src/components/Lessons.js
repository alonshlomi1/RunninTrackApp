import React, { useState, useEffect } from 'react';
import LessonLine from './LessonLine'
import group from '../images/group.png'
import single from '../images/single.png'
import divide from '../images/divide.png'


export default function LessonsRegister(props){
    const [startDate, setStartDate] = useState(getTodayDate(0))
    const [endDate, setEndDate] = useState(getTodayDate(7))
    const [lessons, setLessons] = useState([])
    const [instructors, setInstructors] = useState([])
    
    function getTodayDate(n) {
        const today = new Date();
        today.setDate(today.getDate() + n);
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      }
      useEffect((e) => {
        if (new Date(endDate) > new Date(startDate))
          handle_table(e)
        else
          alert("Invalid Dates")
      }, [endDate, startDate])
    async function handle_instructors(e){  

        //e.preventDefault();
        const requestUserOptions = {
          method: 'GET',
          headers: {
            'accept': "application/json",
          }
        };
      
        try {
          let response = await fetch('http://18.134.144.102:5000/instructors', requestUserOptions);
      
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
        await handle_instructors(e)
        const requestAvailableOptions = {
            method: 'GET',
            headers: {  'accept': "application/json"}
        };
        try {
            const response = await fetch('http://18.134.144.102:5000/lessons/'+props.state.user.object+'/'+new Date(startDate)+'/'+new Date(endDate), requestAvailableOptions);
        
            if (!response.ok)
              throw new Error(response.status);
        
            const data = await response.json();
            setLessons(data)
          }catch (error) {
            alert(error);
          }
      }
    return(
<div className='page'>
    <h3>Search for my Lessons</h3>
    <div>
          <div>
              <label className="label">from:</label>
              <input onChange={(e) => setStartDate(e.target.value)} className="input"
                  value={startDate} type="date" />
          </div>
          <div>
              <label className="label">to:</label>
              <input onChange={(e) => setEndDate(e.target.value)} className="input"
                  value={endDate} type="date" />
          </div >
        </div>
        <div  className='table-div'>
        {lessons.length === 0? <h3>No Lessons</h3> :  <table >
            <thead>
                <tr>
                <th>Date</th>
                <th>Day</th>
                <th>Start</th>
                <th>End</th>
                <th>Instructor</th>
                <th><div className="group-logo">
                    <img src={single} alt="Logo" />
                    <img src={divide} alt="Logo" />
                    <img src={group} alt="Logo" />
                    </div></th>
                </tr>
            </thead>
            <tbody>
                {lessons.map((lesson) => (
                <LessonLine key={lesson._id} lesson={lesson} instructors={instructors}/>
                ))}
            </tbody>
            </table> }
        </div>
        
      </div>
    )

}