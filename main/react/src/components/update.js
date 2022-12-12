import React from 'react';

function Update(){
    return(
        <>
        <h1> Update Event </h1>
     
    
        <form action="" method="post">
       
       <label for="eventId">Event Id</label>
       <input type="text" id="eventId" name="eventId" required/>
       <button type="button" onclick="load()">Load Information</button>
       <br/>
          
       <label for="name">Event name</label>
       <input type="text" id="name" name="name"/>
       <br/>
           
       <label for="locId">Event location</label>
       <input type="text" id="locId" name="locId"/>
       <br/>
           
       <label for="quota">Location quota</label>
       <input type="text" id="quota" name="quota"/>
       <br/>
       
        <button type="button"   onclick="update()">Update</button>
       </form>
       </>
    );
}

export default React.memo(Update) 
