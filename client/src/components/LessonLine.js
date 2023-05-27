import React, { useState } from 'react';
import group from '../images/group.png'
import single from '../images/single.png'
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function LessonsLine(props){
    const lesson = props.lesson

    return(
        <tr key={lesson._id} className='table-line'>
                    <td>{new Date(lesson.start_time).getDate()+"/"+(new Date(lesson.start_time).getMonth()+1)}</td>
                    <td>{daysOfWeek[new Date(lesson.start_time).getDay()]}</td>
                    <td>{new Date(lesson.start_time).toLocaleTimeString()}</td>
                    <td>{new Date(lesson.end_time).toLocaleTimeString()}</td>
                    <td>{(props.instructors.filter(instructor => instructor.id === lesson.instructor)[0].name) }</td>
                    <td>{lesson.is_individual?
                    <div className="group-logo">
                    <img src={single} alt="Logo" />
                    </div>:
                    <div className="group-logo">
                    <img src={group} alt="Logo" />
                    </div>}</td>
                </tr>
    )
}