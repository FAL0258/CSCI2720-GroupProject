
import React from 'react';
import { useParams} from 'react-router-dom';


function Delete(){
    let {chosen} = useParams();
    if( chosen==1){   
    return(<>
       
<div className="text-center">
<h2 style={{background:"rosybrown", color:"white", textAlign:"center"}}>Delete Event</h2>

<form action="" method="post">

<label htmlFor="eventId"  className="d-none">Event Id</label>
<input type="text" className="form-control" style={{width:50+"%", margin:'auto'}} placeholder="EventID" id="eventId" name="eventId"/>

<br/>
<button className="btn btn-lg btn-block" style={{width:50+"%", margin:'auto', backgroundColor: 'rosybrown', color:'white'}}  type="submit">Delete</button>
</form>
</div>
</>

    );}

    if( chosen==2){   
        return(<>
           
    <div className="text-center">
    <h2 style={{background:"rosybrown", color:"white", textAlign:"center"}}>Delete Location</h2>
    
    <form action="" method="post">
    
    <label htmlFor="locationId"  className="d-none">Location ID</label>
    <input type="text" className="form-control" style={{width:50+"%", margin:'auto'}} placeholder="Location ID" id="locationId" name="locationId"/>
    
    <br/>
    <button className="btn btn-lg btn-block" style={{width:50+"%", margin:'auto', backgroundColor: 'rosybrown', color:'white'}}  type="submit">Delete</button>
    </form>
    </div>
    </>
    
        );
}

if( chosen==3){   
    return(<>
       
<div className="text-center">
<h2 style={{background:"rosybrown", color:"white", textAlign:"center"}}>Delete User</h2>

<form action="" method="post">

<label htmlFor="name"  className="d-none">User Name</label>
<input type="text" className="form-control" style={{width:50+"%", margin:'auto'}} placeholder="User Name" id="name" name="name"/>
<br/>
<button className="btn btn-lg btn-block" style={{width:50+"%", margin:'auto', backgroundColor: 'rosybrown', color:'white'}} type="submit">Delete</button>
</form>
</div>
</>

    );
}

}

export default React.memo(Delete);
