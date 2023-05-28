import React, { useState, useEffect } from 'react';
import group from '../images/group.png'
import single from '../images/single.png'
import divide from '../images/divide.png'
import { port } from '../port.js'

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function Schedule(){
  const [tableData, setTableData] = useState([])
  const [startDate, setStartDate] = useState(getTodayDate(7))
  const [endDate, setEndDate] = useState(getTodayDate(14))
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
      let response = await fetch('http://'+port+'2:5000/instructors', requestUserOptions);
  
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
    const requestUserOptions = {
      method: 'GET',
      headers: {
        'accept': "application/json",
        'Content-Type': 'application/json'
      }
    };
  
    try {
      let response = await fetch('http://'+port+':5000/schedule/'+new Date(startDate)+'/'+new Date(endDate), requestUserOptions);
  
      if (!response.ok)
        throw new Error(response.status);
  
      response = await response.json()
      let updetedResponse = response.map(item =>{
         return{
          ...item,
           is_individual:true}})
      setTableData(updetedResponse)
    } catch (error) {
      alert(error);
    }
  }
  async function handle_save(e){
    e.preventDefault();
    const requestSaveLessonsOptions = {
      method: 'POST',
      headers: {
        'accept': "application/json",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tableData)
    };
    try {
      let response = await fetch('http://'+port+':5000/lessons/group', requestSaveLessonsOptions);
      if (!(response.ok ))
        throw new Error(response.status);
  
      response = await response.json()
      alert("Saved")
    } catch (error) {
      alert(error);
    }
      
  }
  return <div className='page'>
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
    <div className="table_div">
    {tableData.length === 0? <h3>No Available Time</h3> :  <table>
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
                <th></th>
                </tr>
            </thead>
            <tbody>
                {tableData.map((event) => (
                <tr key={event._id}>
                    <td>{new Date(event.start_time).getDate()+"/"+(new Date(event.start_time).getMonth()+1)}</td>
                    <td>{daysOfWeek[new Date(event.start_time).getDay()]}</td>
                    <td>{new Date(event.start_time).toLocaleTimeString()}</td>
                    <td>{new Date(event.end_time).toLocaleTimeString()}</td>
                    <td><div className="group-logo">
                      {event.is_individual?<img src={single} alt="Logo" />:<img src={group} alt="Logo" />}
                    </div></td>
                    <td>{(instructors.filter(instructor => instructor.id === event.instructor)[0].name) }</td>
                    <td><button className='btn' onClick={() => {
                          let filteredArray = tableData.filter(item => item !== event)
                          setTableData(filteredArray)
                    }}>
                      Remove</button></td>
                      <td> <button className='btn' onClick={() => {
                      let updetedArray = tableData.map(item => item === event? {...event, is_individual: !event.is_individual}: item)
                      setTableData(updetedArray)
                    }}>{event.is_individual?"Group Lesson":"UnGroup "}</button></td>
                </tr>
                ))}
            </tbody>
            </table> }
    </div>
    {tableData.length === 0?"":
    <button className='save-button' onClick={handle_save}>Save</button>}
  </div>;
}
