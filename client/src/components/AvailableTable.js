import React, { useState, useEffect } from 'react';
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function AvailableTable(props){
    const [startDate, setStartDate] = useState(getTodayDate(0))
    const [endDate, setEndDate] = useState(getTodayDate(7))
    const [tableData, setTableData] = useState([])
    const [editDate, setEditDate] = useState('');
    const [editStartHour, setEditStartHour] = useState('');
    const [editEndHour, setEditEndHour] = useState('');
    const [edit, setEdit] = useState(null)

    function getTodayDate(n) {
      const today = new Date();
      today.setDate(today.getDate() + n);
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    
    const handleSave = async (e, availavle) => {
        e.preventDefault();
        const requestAvailableOptions = {
            method: 'PATCH',
            headers: {  'Content-Type': 'application/json'},
            body: JSON.stringify({ start_time: new Date(Date.parse(editDate+" "+editStartHour)),
                                   end_time: new Date(Date.parse(editDate+" "+editEndHour)),
                                   instructor: props.state.user.object})
        };
        
        try {
            const response = await fetch('http://localhost:5000/available/'+availavle._id, requestAvailableOptions);
        
            if (!response.ok)
              throw new Error(response.status);
              setEdit(null)
              alert("Saved");
            //handle_table()
            
          }catch (error) {
            alert(error);
          }
      }
      useEffect((e) => {
        if (new Date(endDate) > new Date(startDate))
          handle_table(e)
        else
          alert("Invalid Dates")
      }, [endDate, startDate, handleSave])
  
    const handle_table = async (e) =>{
        //e.preventDefault();
        const requestAvailableOptions = {
            method: 'GET',
            headers: {  'accept': "application/json"}
        };
        
        try {
            const response = await fetch('http://localhost:5000/available/'+props.state.user.object+'/'+new Date(startDate)+'/'+new Date(endDate), requestAvailableOptions);
        
            if (!response.ok)
              throw new Error(response.status);
        
            const data = await response.json();
            setTableData(data)
          }catch (error) {
            alert(error);
          }
    }
    
const handleEdit = async (e, available) => {
        const dateParts = available.start_time.split("T")[0].split("-");
        const year = dateParts[0];
        const month = dateParts[1];
        const day = dateParts[2]; 
        const formattedDate = `${year}-${month}-${day}`;
        setEditDate(formattedDate)
      
        let time = available.start_time.split("T")[1].split(":");
        let hour = time[0];
        let minute = time[1];
        let formattedStart_time = `${hour}:${minute}`;
        setEditStartHour(formattedStart_time)
        time = available.end_time.split("T")[1].split(":");
        hour = time[0];
        minute = time[1];
        formattedStart_time = `${hour}:${minute}`;
        setEditEndHour(formattedStart_time)
        setEdit(available._id)
      
      };
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
        {tableData.length == 0? <br/> :  <table>
            <thead>
                <tr>
                <th>Date</th>
                <th>Day</th>
                <th>Start</th>
                <th>End</th>
                <th> </th>
                </tr>
            </thead>
            <tbody>
                {tableData.map((availavle) => {
                    if(edit == availavle._id){ return(
                      <tr key={availavle._id}>
                      <td><input onChange={(e) => setEditDate(e.target.value)} className="input"
                          value={editDate} type="date" /></td>
                  <td> </td>
                  <td><input onChange={(e) => setEditStartHour(e.target.value)} className="input"
                          value={editStartHour} type="time" /></td>
                  <td><input onChange={(e) => setEditEndHour(e.target.value)} className="input"
                          value={editEndHour} type="time" /></td>
                  <td>
                    <button className='btn' onClick={(e) => handleSave(e, availavle)}>
                      Save
                    </button>
                    <button className='btn' onClick={() => setEdit(null)}>
                      Cancel
                    </button>
                  </td>
                    </tr>)}
                  else{
                    return(<tr key={availavle._id}>
                  <td>{new Date(availavle.start_time).getDate()+"/"+(new Date(availavle.start_time).getMonth()+1)}</td>
                  <td>{daysOfWeek[new Date(availavle.start_time).getDay()]}</td>
                  <td>{new Date(availavle.start_time).toLocaleTimeString()}</td>
                  <td>{new Date(availavle.end_time).toLocaleTimeString()}</td>
                  <td>
                    <button className='btn' onClick={(e) => handleEdit(e, availavle)}>
                      Edit
                    </button>
                  </td>
              </tr>)
              }
                
        })}
                
            </tbody>
            </table> }
        </div>
      )
}
