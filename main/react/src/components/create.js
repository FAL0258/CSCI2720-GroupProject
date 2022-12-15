
import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import GLB from "../config.js";


function Create(props){
let {chosen} = useParams();
//form 1
 if( chosen==1){   
     
     const createEv = (event, evId, evTitle, locId, evDate, des, pre, price) => {
          event.preventDefault();
          //console.log("RRRR", evId, evTitle, locId, evDate, des, pre, price);
          
          let data = new URLSearchParams();
          //let api = "http://localhost:4000/create/1";
          let api = GLB.BACKEND_API + "/create/1";
          data.append("eventId", evId);
          data.append("title", evTitle);
          data.append("locationId", locId);
          data.append("date", evDate);
          data.append("description", des);
          data.append("presenter", pre);
          data.append("price", price);
          
          fetch(api, { method: "post", body: data })
          .then(res => res.text())
          .then(data => {
               console.log(data);
               window.alert(data);
               if ( data.indexOf("Created") != -1){
                    props.setEnd = null;
               }
          })
          .catch(err => console.log(err));
          
     }

     return(
     <>

<div className="text-center">
<h2 style={{background:"rosybrown", color:"white", textAlign:"center"}}>Create Event</h2>

<form method="post">

<label htmlFor="eventId"  className="d-none">Event Id</label>
<input type="text" className="form-control" style={{width:50+"%", margin:'auto'}} placeholder="Event ID" id="eventId" name="eventId"/>
<br/>

<label htmlFor="title" className="d-none">Title</label>
<input type="text" className="form-control" style={{width:50+"%", margin:'auto'}} placeholder="Event Title" id="title" name="title"/>
<br/>

<label htmlFor="locationId" className="d-none">Location ID</label>
<input type="text" className="form-control" style={{width:50+"%", margin:'auto'}} placeholder="Location ID" id="locationId" name="locationId"/>
<br/>

<label htmlFor="date" className="d-none">Date</label>
<input type="text" className="form-control" style={{width:50+"%", margin:'auto'}} placeholder="Event Date" id="date" name="date"/>
<br/>

<label htmlFor="description" className="d-none">Description</label>
<input type="text" className="form-control" style={{width:50+"%", margin:'auto'}} placeholder="Description" id="description" name="description"/>
<br/>

<label htmlFor="presenter" className="d-none">Presenter</label>
<input type="text" className="form-control" style={{width:50+"%", margin:'auto'}} placeholder="Presenter" id="presenter" name="presenter"/>
<br/>

<label htmlFor="price" className="d-none">Price</label>
<input type="text" className="form-control" style={{width:50+"%", margin:'auto'}} placeholder="Price" id="price" name="price"/>
<br/>

<button className="btn btn-lg btn-block" style={{width:50+"%", margin:'auto', backgroundColor: 'rosybrown', color:'white'}} type="button" onClick={e => createEv(
                                                                                                                                       e, 
                                                                                                                                       document.getElementById('eventId').value, document.getElementById('title').value, 
                                                                                                                                       document.getElementById('locationId').value, document.getElementById('date').value,
                                                                                                                                       document.getElementById('description').value, document.getElementById('presenter').value,
                                                                                                                                       document.getElementById('price').value )}>Create</button>
</form>
</div>
</>
    );}

//form 2  
if( chosen==2){   

     const createLoc = (event, locId, name, lat, lng) => {
          event.preventDefault();
          
          let data = new URLSearchParams();
          let api = GLB.BACKEND_API + "/create/2";
          data.append("locationId", locId);
          data.append("name", name);
          data.append("latitude", lat);
          data.append("longitude", lng);
          
          fetch(api, { method: "post", body: data })
          .then(res => res.text())
          .then(data => {
               console.log(data);
               window.alert(data);
               if ( data.indexOf("Created") != -1){
                    props.setEnd(null);
               }
          })
          .catch(err => console.log(err));
          
     }
     
     return(
        <>
       
 
<div className="text-center">
<h2 style={{background:"rosybrown", color:"white", textAlign:"center"}}>Create Location</h2>

<form method="post">

<label htmlFor="locationId"  className="d-none">Location ID</label>
<input type="text" className="form-control" style={{width:50+"%", margin:'auto'}} placeholder="Location ID" id="locationId" name="locationId"/>
<br/>

<label htmlFor="name" className="d-none">Location Name</label>
<input type="text" className="form-control" style={{width:50+"%", margin:'auto'}} placeholder="Location Name" id="name" name="name"/>
<br/>

<label htmlFor="latitude" className="d-none">Latitude</label>
<input type="text" className="form-control" style={{width:50+"%", margin:'auto'}} placeholder="Latitude" id="latitude" name="latitude"/>
<br/>

<label htmlFor="longitude" className="d-none">Longitude</label>
<input type="text" className="form-control" style={{width:50+"%", margin:'auto'}} placeholder="Longitude" id="longitude" name="longitude"/>
<br/>

<button className="btn btn-lg btn-block" style={{width:50+"%", margin:'auto', backgroundColor: 'rosybrown', color:'white'}} type="button" onClick={e => createLoc(
                                                                                                                                       e, 
                                                                                                                                       document.getElementById('locationId').value, document.getElementById('name').value, 
                                                                                                                                       document.getElementById('latitude').value, document.getElementById('longitude').value
                                                                                                                                       )}>Create</button>
</form>
</div>
</>
     );}
//form3
     if( chosen==3){   
          const createUser = (event, userName, userAc, password) => {
               event.preventDefault();
               
               let data = new URLSearchParams();
               let api = GLB.BACKEND_API + "/create/3";
               data.append("userName", userName);
               data.append("userAc", userAc);
               data.append("password", password);
               
               fetch(api, { method: "post", body: data })
               .then(res => res.text())
               .then(data => {
                    console.log(data);
                    window.alert(data);
                    if ( data.indexOf("Created") != -1){
                         props.setEnd(null);
                    }
               })
               .catch(err => console.log(err));
               
          }

     return(
        <>
         
 
         <div className="text-center">
<h2 style={{background:"rosybrown", color:"white", textAlign:"center"}}>Create User</h2>

<form method="post">

<label htmlFor="userName"  className="d-none">Name</label>
<input type="text" className="form-control" style={{width:50+"%", margin:'auto'}} placeholder="Name" id="userName" name="userName"/>
<br/>

<label htmlFor="userAc"  className="d-none">Account</label>
<input type="text" className="form-control" style={{width:50+"%", margin:'auto'}} placeholder="Account" id="userAc" name="userAc"/>
<br/>

<label htmlFor="password" className="d-none">Password</label>
<input type="password" className="form-control" style={{width:50+"%", margin:'auto'}} placeholder="Password" id="password" name="password"/>
<br/>

<button className="btn btn-lg btn-block" style={{width:50+"%", margin:'auto', backgroundColor: 'rosybrown', color:'white'}} type="button" onClick={e => createUser(
                                                                                                                                       e, 
                                                                                                                                       document.getElementById('userName').value,
                                                                                                                                       document.getElementById('userAc').value, document.getElementById('password').value
                                                                                                                                       )}>Create</button>
</form>
</div>
 </>
     );}
}

export default React.memo(Create);
