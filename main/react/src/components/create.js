
import React from 'react';

function Create(){
    return(
       <>
        

<h1>Create Event</h1>

<form action="" method="post">

<label for="eventname">Event name</label>
<input type="text" id="eventname" name="name"/>
<br/>

<label for="eventloc">Location ID</label>
<input type="text" id="eventloc" name="loc"/>
<br/>

<label for="eventquota">Event quota</label>
<input type="text" id="eventquota" name="quota"/>
<br/>

<input type="submit"/>
</form>
</>
    );
}

export default React.memo(Create);