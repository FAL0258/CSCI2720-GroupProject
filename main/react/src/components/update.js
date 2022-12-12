import React from 'react';

function Update(){

    const load = (event) => {
        event.preventDefault();
    }

    const update = (event) => {
        event.preventDefault();
    }

    return(
        <>
        <h1> Update Event </h1>
     
    
        <form action="" method="post">
       
       <label htmlFor="eventId">Event Id</label>
       <input type="text" id="eventId" name="eventId" required/>
       <button type="button" onClick={e => load(e)}>Load Information</button>
       <br/>
          
       <label htmlFor="name">Event name</label>
       <input type="text" id="name" name="name"/>
       <br/>
           
       <label htmlFor="locId">Event location</label>
       <input type="text" id="locId" name="locId"/>
       <br/>
           
       <label htmlFor="quota">Location quota</label>
       <input type="text" id="quota" name="quota"/>
       <br/>
       
        <button type="button"   onClick={e => update(e)}>Update</button>
       </form>
       </>
    );
}

export default React.memo(Update) 
