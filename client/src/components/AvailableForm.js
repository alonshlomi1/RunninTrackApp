import React, { useState } from 'react';
import port from '../port'
export default function AvailableForm(props){
    const [date, setDate] = useState(getTodayDate(7));
    const [startHour, setStartHour] = useState('');
    const [endHour, setEndHour] = useState('');
    const handleDate = (e) => {
        setDate(e.target.value);
      };
      function getTodayDate(n) {
        const today = new Date();
        today.setDate(today.getDate() + n);
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      }
      // Handling the password change
      const handleStartHour = (e) => {
        setStartHour(e.target.value);
      };
      const handleEndHour = (e) => {
        setEndHour(e.target.value);
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(new Date(Date.parse(date+" "+startHour)) )
        const requestAvailableOptions = {
            method: 'POST',
            headers: {  'accept': "application/json",
                        'Content-Type': 'application/json'},
            body: JSON.stringify({ start_time: new Date(Date.parse(date+" "+startHour)),
                                   end_time: new Date(Date.parse(date+" "+endHour)),
                                   instructor: props.state.user.object})
        };
        
        try {
            const response = await fetch('http://'+port+':5000/available', requestAvailableOptions);
        
            if (!response.ok)
              throw new Error(response.status);
        
            await response.json();

            alert('Saved')
          }catch (error) {
            alert(error);
          }
      }
    return(
        <div>
        <form>
          <div className="input-container">
            <label>Date </label>
            <input onChange={handleDate} className="input"
                        value={date} type="date" />
          </div>
          <div className="input-container">
            <label>Start Hour </label>
            <input onChange={handleStartHour} className="input"
                        value={startHour} type="time" />
          </div>
          <div className="input-container">
            <label>End Hour </label>
            <input onChange={handleEndHour} className="input"
                        value={endHour} type="time" />
          </div>
          <div className="button-container">
          <button onClick={handleSubmit} className="btn"
                disabled={(date === '' || startHour === '')}
                        type="submit">
                    Submit
          </button>
          </div>
        </form>
        </div>
    )
}