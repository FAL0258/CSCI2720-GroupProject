import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useParams, useLocation } from 'react-router-dom';

function CRUDevent (){
  let {chosen} = useParams();

    return(<>
     <div className="container">
      <div className="row">
   
    <div className="col-3 my-5" style={{display:'flex',justifyContent:'center'}}>
    <Link to={"/create/"+chosen}><button type="button" className="btn btn-lg" style={{backgroundColor: 'rosybrown', color:'white'}}>Create</button></Link>
    </div>
    <div className="col-3 my-5" style={{display:'flex',justifyContent:'center'}}>
    <Link to={"/read/"+chosen}><button type="button" className="btn btn-lg" style={{backgroundColor: 'rosybrown', color:'white'}}>Read</button></Link>
    </div>
    <div className="col-3 my-5" style={{display:'flex',justifyContent:'center'}}>
      <Link to={"/update/"+chosen}><button type="button" className="btn btn-lg" style={{backgroundColor: 'rosybrown', color:'white'}}>Update</button></Link>
    </div>
    <div className="col-3 my-5" style={{display:'flex',justifyContent:'center'}}>
    <Link to={"/delete/"+chosen}><button type="button" className="btn btn-lg" style={{backgroundColor: 'rosybrown', color:'white'}}>Delete</button></Link>
    </div>
    </div></div>
    
  
    
    </>);

    }






    
    export default React.memo(CRUDevent) 
