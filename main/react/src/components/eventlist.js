import React, { useState, useEffect } from 'react';

const EventList = (props) => {
    let str="";
    

    
    const wtf = async() => {
       
      
   console.log(props.locationObjectId );
    for (let i = 0; i < props.evDataSet.length; i++) {
        if (props.evDataSet[i].venue.toString() == props.locationObjectId.toString()) 
        {
           str+="<button>"+props.evDataSet[i].title+"</button>"+"<br/>";
            
            document.querySelector("#comments").innerHTML =str;
           
        }
      }
    
}

    wtf();

    return(
        <>

                        <div className="mb-3">
                            <div id="comments"> </div>
                            <label htmlFor="new-comment" className="form-label">Comment</label>
                            <textarea className="form-control" id="new-comment" rows="3" required></textarea>
                        </div>

        
        </>

    );

}

export default React.memo(EventList);