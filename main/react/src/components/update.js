import React from 'react';
import { useParams} from 'react-router-dom';


function Update(){
    let {chosen} = useParams();
    //form 1 = update events
     if( chosen==1){ 
        const load = (event, evId) => {
            event.preventDefault();
            
        }
    
        const update = (event, evTitle, evVenue, evDate, dse, pre, price) => {
            event.preventDefault();

        }

    return(
        <>

<div className="text-center">
<h2 style={{background:"rosybrown", color:"white", textAlign:"center"}}>Update Event</h2>
        
     
    
        <form action="" method="post">

        <label htmlFor="eventId"  className="d-none">Event Id</label>
        <input type="text" className="form-control" style={{width:50+"%", margin:'auto'}} placeholder="EventID" id="eventId" name="eventId" required/>
    <br/>
        
       <button className="btn btn-lg btn-block" style={{width:50+"%", margin:'auto', backgroundColor: 'rosybrown', color:'white'}} type="button" onClick={""}>Load Information</button>
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

       
        <button className="btn btn-lg btn-block" style={{width:50+"%", margin:'auto', backgroundColor: 'rosybrown', color:'white'}} type="button"   onClick={e => update(e)}>Update</button>
       </form></div>
       </>
    );}
    //form 2  = update location
    else if( chosen==2){ 
        const load = (event) => {
            event.preventDefault();
            
        }
    
        const update = (event) => {
            event.preventDefault();
        }
        return(
            <>
            <div className="text-center">
            <h2 style={{background:"rosybrown", color:"white", textAlign:"center"}}>Update Location</h2>

        
            <form action="" method="post">

            <label htmlFor="locationId"  className="d-none">Location ID</label>
            <input type="text" className="form-control" style={{width:50+"%", margin:'auto'}} placeholder="Location ID" id="locationId" name="locationId" required/>
            <br/>
           
            <button className="btn btn-lg btn-block" style={{width:50+"%", margin:'auto', backgroundColor: 'rosybrown', color:'white'}} type="button" onClick={e => load(e)}>Load Information</button>
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
                      
            <button className="btn btn-lg btn-block" style={{width:50+"%", margin:'auto', backgroundColor: 'rosybrown', color:'white'}} type="button"   onClick={e => update(e)}>Update</button>
           </form></div>
           </>
        );}
     //form 3 = update users
     else if( chosen==3){ 
        return(
            <>
            <div className="text-center">
            <h2 style={{background:"rosybrown", color:"white", textAlign:"center"}}>Update User</h2>

            
            <form action="" method="post">

            <label htmlFor="userAc"  className="d-none">Account</label>
            <input type="text" className="form-control" style={{width:50+"%", margin:'auto'}} placeholder="Account" id="userAc" name="userAc"/>
            <br/>

           
            <button className="btn btn-lg btn-block" style={{width:50+"%", margin:'auto', backgroundColor: 'rosybrown', color:'white'}} type="button" onClick={""}>Load Information</button>
       <br/> <br/> 
            
         <label htmlFor="password" className="d-none">User Password</label>
            <input type="text" className="form-control" style={{width:50+"%", margin:'auto'}} placeholder="User Password" id="password" name="password"/>
            <br/>
                      
            <button className="btn btn-lg btn-block" style={{width:50+"%", margin:'auto', backgroundColor: 'rosybrown', color:'white'}} type="button"   onClick={""}>Update</button>
           </form></div>
           </>
        );

}
}
export default React.memo(Update) 
