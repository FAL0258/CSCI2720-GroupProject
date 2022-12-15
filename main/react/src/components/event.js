import React, { useState, useEffect } from 'react';
import GLB from "../config.js";

const Event = (props) => {
     function showevent(){ //fetch the eventdetail from server
        let url=GLB.BACKEND_API+ "/read/1/"+props.evId;
        console.log(props.evId);
        fetch(url).then(res=>res.json()).then (ev=>{
            let str="";
            str = "eventname: " + ev.title + "<br><br>" +
            "date: " + ev.date + "<br><br>" +
            "description: " + ev.description + "<br><br>" +
            "presenter: " + ev.presenter + "<br><br>" +
            "price: " + ev.price;        
            document.querySelector("#eventdetail").innerHTML=str;
        })
        .catch(error=>console.log(error))
     }
    // show the eventdetail
    showevent();
    return(
        <div className="container">
            <div className="row">
               <p>EVENT DETAIL: 
                    <i style={{alignContent: "right"}} className="bi bi-heart text-right"></i>
                    </p>    
               
               <br/>

            </div>
            <div id="eventdetail"> </div>
        </div>
    );
}

export default React.memo(Event);
