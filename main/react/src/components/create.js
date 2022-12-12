
import React from 'react';
import { useParams, useLocation } from 'react-router-dom';


function Create(){
let {chosen} = useParams();
//form 1
 if( chosen==1){   return(
       <>

<body className="text-center">
<h2 style={{background:"rosybrown", color:"white", textAlign:"center"}}>Create Event</h2>

<form action="" method="post">

<label for="eventId"  className="d-none">Event Id</label>
<input type="text" className="form-control" style={{width:400, margin:'auto'}} placeholder="EventID" id="eventId" name="eventId"/>
<br/>

<label for="title" className="d-none">Title</label>
<input type="text" className="form-control" style={{width:400, margin:'auto'}} placeholder="Event Title" id="title" name="title"/>
<br/>

<label for="venue" className="d-none">Venue</label>
<input type="text" className="form-control" style={{width:400, margin:'auto'}} placeholder="Event Venue" id="venue" name="venue"/>
<br/>

<label for="date" className="d-none">Date</label>
<input type="text" className="form-control" style={{width:400, margin:'auto'}} placeholder="Event Date" id="date" name="date"/>
<br/>

<label for="description" className="d-none">Description</label>
<input type="text" className="form-control" style={{width:400, margin:'auto'}} placeholder="Description" id="description" name="description"/>
<br/>

<label for="presenter" className="d-none">Presenter</label>
<input type="text" className="form-control" style={{width:400, margin:'auto'}} placeholder="Presenter" id="presenter" name="presenter"/>
<br/>

<label for="price" className="d-none">Presenter</label>
<input type="text" className="form-control" style={{width:400, margin:'auto'}} placeholder="Price" id="price" name="price"/>
<br/>

<button class="btn btn-lg btn-block" style={{width:400, margin:'auto', backgroundColor: 'rosybrown', color:'white'}} type="submit">Create</button>
</form>
</body>
</>
    );}

//form 2  
if( chosen==2){   return(
        <>
       
 
<body className="text-center">
<h2 style={{background:"rosybrown", color:"white", textAlign:"center"}}>Create Location</h2>

<form action="" method="post">

<label for="locationId"  className="d-none">Location ID</label>
<input type="text" className="form-control" style={{width:400, margin:'auto'}} placeholder="Location ID" id="locationId" name="locationId"/>
<br/>

<label for="name" className="d-none">Location Name</label>
<input type="text" className="form-control" style={{width:400, margin:'auto'}} placeholder="Location Name" id="name" name="name"/>
<br/>

<label for="latitude" className="d-none">Latitude</label>
<input type="text" className="form-control" style={{width:400, margin:'auto'}} placeholder="Latitude" id="latitude" name="latitude"/>
<br/>

<label for="longitude" className="d-none">Longitude</label>
<input type="text" className="form-control" style={{width:400, margin:'auto'}} placeholder="Longitude" id="longitude" name="longitude"/>
<br/>

<button class="btn btn-lg btn-block" style={{width:400, margin:'auto', backgroundColor: 'rosybrown', color:'white'}} type="submit">Create</button>
</form>
</body>
</>
     );}
//form3
     if( chosen==3){   return(
        <>
         
 
         <body className="text-center">
<h2 style={{background:"rosybrown", color:"white", textAlign:"center"}}>Create User</h2>

<form action="" method="post">

<label for="name"  className="d-none">User Name</label>
<input type="text" className="form-control" style={{width:400, margin:'auto'}} placeholder="User Name" id="name" name="name"/>
<br/>

<label for="password" className="d-none">User Password</label>
<input type="text" className="form-control" style={{width:400, margin:'auto'}} placeholder="User Password" id="password" name="password"/>
<br/>

<button class="btn btn-lg btn-block" style={{width:400, margin:'auto', backgroundColor: 'rosybrown', color:'white'}} type="submit">Create</button>
</form>
</body>
 </>
     );}
}

export default React.memo(Create);
