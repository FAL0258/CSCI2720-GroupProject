import React, { useState, useEffect } from 'react';
import GLB from "../config.js";

const Event = (props) => {
     function showevent(){ //fetch the eventdetail from server
        let index = 0;
        for( let i = 0; i < props.evDataSet.length; i++ ){
            if (props.evDataSet[i].eventId == props.evId)
                index = i;
        }
        try{
            let str="";
            str = "eventname: " + props.evDataSet[index].title + "<br><br>" +
            "date: " + props.evDataSet[index].date + "<br><br>" +
            "description: " + props.evDataSet[index].description + "<br><br>" +
            "presenter: " + props.evDataSet[index].presenter + "<br><br>" +
            "price: " + props.evDataSet[index].price;
            document.querySelector("#eventdetail").innerHTML=str;
        }
        catch(error){
            console.log(error);
        };
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
