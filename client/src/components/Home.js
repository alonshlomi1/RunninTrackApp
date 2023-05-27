import React, { useState, useEffect } from 'react';


export default function Home(props){


    async function handle_user_info(e){
        //e.preventDefault();
        const requestUserInfoOptions = {
            method: 'GET',
            headers: {  'accept': "application/json"}
        };
        try {
            const response = await fetch('http://18.134.144.102:5000/'+(props.state.user.type==="student"?"students":"instructors")+'/'+props.state.user.object, requestUserInfoOptions);
        
            if (!response.ok)
              throw new Error(response.status);
        
            const data = await response.json();
            props.setState(prev => {
                return {
                  ...prev,
                  user_info: data
                };
              });
          }catch (error) {
            alert(error);
          }
      }
      useEffect((e) => {
        handle_user_info(e)
      }, [])
    return(
        <div>

            <div className='welcome'>
                <h1>Welcome to Running Track Schedule</h1>
                <h3 >welcome back {props.state.user_info?props.state.user_info.name.split(" ")[0]:''}</h3>
            </div>
            <div className='some-info'></div>
            <div className='home-options'>
              <p>check out your options:</p>
              {props.state.menu.map(option => {
                return(
                  <div key={option}>
                    <button  className='option-button' onClick={() =>props.setState(prev => {
                      return{...prev,
                        page: option}
                    })} value={option}>
                      {option}
                    </button>
                  </div>
                  
                )
              })}
            </div>
        </div>
    )
}