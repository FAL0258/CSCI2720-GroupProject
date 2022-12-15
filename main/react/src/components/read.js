import React from 'react';
import { useParams } from 'react-router-dom';
import GLB from "../config.js";

function Read(props){
    let {chosen} = useParams();
    //form 1

    const load = (event, evId) => {
        event.preventDefault();
        //console.log(evId);
        for (let i = 0; i < props.evDataSet.length; i++){
            if (props.evDataSet[i].eventId.toString() == evId.toString()){
                let api = GLB.BACKEND_API + "/read/4/" + props.evDataSet[i].eventId;
                fetch(api)
                .then(response => response.json())
                .then(json => {
                    console.log(json);
                    console.log(props.evDataSet[i]);
                    document.getElementById('title').value = props.evDataSet[i].title;
                    document.getElementById('venue').value = json.name;
                    document.getElementById('date').value = props.evDataSet[i].date;
                    document.getElementById('description').value = props.evDataSet[i].description;
                    document.getElementById('presenter').value = props.evDataSet[i].presenter;
                    document.getElementById('price').value = props.evDataSet[i].price;
                });
                
                break;
            }
        }
    }

     if( chosen==1){ 
    return(
        <>

<div className="text-center">
<h2 style={{background:"rosybrown", color:"white", textAlign:"center"}}>Read Event</h2>
        
     
    
        <form action="" method="post">

        <label htmlFor="eventId"  className="d-none">Event Id</label>
        <input type="text" className="form-control" style={{width:50+"%", margin:'auto'}} placeholder="EventID" id="eventId" name="eventId" required/>
    <br/>
        
       <button className="btn btn-lg btn-block" style={{width:50+"%", margin:'auto', backgroundColor: 'rosybrown', color:'white'}} type="button" onClick={e => load(e, document.getElementById('eventId').value)}>Load Information</button>
       <br/> <br/> 

       <label htmlFor="title" className="d-none">Title</label>
        <input type="text" className="form-control" style={{width:50+"%", margin:'auto'}} placeholder="Event Title" id="title" name="title"/>
        <br/> 
          
       
        <label htmlFor="venue" className="d-none">Venue</label>
        <input type="text" className="form-control" style={{width:50+"%", margin:'auto'}} placeholder="Event Venue" id="venue" name="venue"/>
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

       
    
       </form></div>
       </>
    );}
    //form 2  
    else if( chosen==2){ 
        return(
            <>
            <div className="text-center">
            <h2 style={{background:"rosybrown", color:"white", textAlign:"center"}}>Read Location</h2>

        
            <form action="" method="post">

            <label htmlFor="locationId"  className="d-none">Location ID</label>
            <input type="text" className="form-control" style={{width:50+"%", margin:'auto'}} placeholder="Location ID" id="locationId" name="locationId" required/>
            <br/>
           
            <button className="btn btn-lg btn-block" style={{width:50+"%", margin:'auto', backgroundColor: 'rosybrown', color:'white'}}  type="button" onClick={e => load(e)}>Load Information</button>
       <br/> <br/> 
            
            <label htmlFor="name" className="d-none">Location Name</label>
            <input type="text" className="form-control" style={{width:50+"%", margin:'auto'}} placeholder="Location Name" id="name" name="name"/>
            <br/>
              
            <label htmlFor="latitude" className="d-none">Latitude</label>
            <input type="text" className="form-control" style={{width:50+"%", margin:'auto'}} placeholder="Latitude" id="latitude" name="latitude"/>
            <br/>

            <label htmlFor="longitude" className="d-none">Longitude</label>
            <input type="text" className="form-control" style={{width:50+"%", margin:'auto'}} placeholder="Longitude" id="longitude" name="longitude"/>
            <br/>
                      
           
           </form></div>
           </>
        );}
     //form 3  
     else if( chosen==3){ 
        return(
            <>
            <div className="text-center">
            <h2 style={{background:"rosybrown", color:"white", textAlign:"center"}}>Read User</h2>

            
            <form action="" method="post">

            <label htmlFor="userAc"  className="d-none">Account</label>
            <input type="text" className="form-control" style={{width:50+"%", margin:'auto'}} placeholder="Account" id="userAc" name="userAc"/>
            <br/>

           
            <button className="btn btn-lg btn-block" style={{width:50+"%", margin:'auto', backgroundColor: 'rosybrown', color:'white'}}  type="button" onClick={e => load(e)}>Load Information</button>
       <br/> <br/> 
            
         <label htmlFor="password" className="d-none">User Password</label>
            <input type="password" className="form-control" style={{width:50+"%", margin:'auto'}} placeholder="User Password" id="password" name="password"/>
            <br/>
                      
           
           </form></div>
           </>
        );

}
}



export default React.memo(Read);
