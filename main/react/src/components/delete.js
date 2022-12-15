
import React from 'react';
import { useParams} from 'react-router-dom';
import GLB from "../config.js";


function Delete(props){
    let {chosen} = useParams();
    if( chosen==1){   
        const del = (event, evId) =>{
            event.preventDefault();
            let data = new URLSearchParams();
            let api = GLB.BACKEND_API + "/delete/1";
            data.append("eventId", evId);
            
            fetch(api, { method: "post", body: data })
            .then(res => res.text())
            .then(txt => {
                //console.log(txt.indexOf("Cannot"));
                if( txt.indexOf("Cannot") == -1 ){
                    props.setEnd(null);
                    window.alert("Event " + evId +" deleted successfully");
                }
                else window.alert("Event not found");
            })
            .catch(err => window.alert("Event not found"));
        };
    return(<>
       
<div className="text-center">
<h2 style={{background:"rosybrown", color:"white", textAlign:"center"}}>Delete Event</h2>

<form>

<label htmlFor="eventId"  className="d-none">Event Id</label>
<input type="text" className="form-control" style={{width:50+"%", margin:'auto'}} placeholder="EventID" id="eventId" name="eventId"/>

<br/>
<button className="btn btn-lg btn-block" style={{width:50+"%", margin:'auto', backgroundColor: 'rosybrown', color:'white'}}  type="button" onClick={e=> del(e, document.getElementById('eventId').value)}>Delete</button>
</form>
</div>
</>

    );}

    if( chosen==2){   
        const del = (event, locId) =>{
            event.preventDefault();
            let data = new URLSearchParams();
            let api = GLB.BACKEND_API + "/delete/2";
            data.append("locationId", locId);
            
            fetch(api, { method: "post", body: data })
            .then(res => res.text())
            .then(txt => {
                //console.log(txt.indexOf("Cannot"));
                if( txt.indexOf("Cannot") == -1 ){
                    props.setEnd(null);
                    window.alert("Location " + locId +" deleted successfully");
                }
                else window.alert("Location not found");
            })
            .catch(err => window.alert("Location not found"));
        };
        return(<>
           
    <div className="text-center">
    <h2 style={{background:"rosybrown", color:"white", textAlign:"center"}}>Delete Location</h2>
    
    <form>
    
    <label htmlFor="locationId"  className="d-none">Location ID</label>
    <input type="text" className="form-control" style={{width:50+"%", margin:'auto'}} placeholder="Location ID" id="locationId" name="locationId"/>
    
    <br/>
    <button className="btn btn-lg btn-block" style={{width:50+"%", margin:'auto', backgroundColor: 'rosybrown', color:'white'}}  type="button" onClick={e=> del(e, document.getElementById('locationId').value)}>Delete</button>
    </form>
    </div>
    </>
    
        );
}

if( chosen==3){   
    const del = (event, userAc) =>{
        event.preventDefault();
        let data = new URLSearchParams();
        let api = GLB.BACKEND_API + "/delete/3";
        data.append("userAc", userAc);
        
        fetch(api, { method: "post", body: data })
        .then(res => res.text())
        .then(txt => {
            //console.log(txt.indexOf("Cannot"));
            if( txt.indexOf("Cannot") == -1 ){
                window.alert("User " + userAc +" deleted successfully");
                props.setEnd(null);
            }
            else window.alert("User not found");
        })
        .catch(err => window.alert("User not found"));
    };
    return(<>
       
<div className="text-center">
<h2 style={{background:"rosybrown", color:"white", textAlign:"center"}}>Delete User</h2>

<form>

<label htmlFor="userAc"  className="d-none">Account</label>
<input type="text" className="form-control" style={{width:50+"%", margin:'auto'}} placeholder="Account" id="userAc" name="userAc"/>
<br/>
<button className="btn btn-lg btn-block" style={{width:50+"%", margin:'auto', backgroundColor: 'rosybrown', color:'white'}} type="button" onClick={e=> del(e, document.getElementById('userAc').value)}>Delete</button>
</form>
</div>
</>

    );
}

}

export default React.memo(Delete);
