import React from 'react';
import Middle from '../index.js'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function CRUDevent1 (){
  
    return(<>
     <div className="container">
      <div className="row">
    
    <div className="col-4 my-5" style={{display:'flex',justifyContent:'center'}}>
    <Link to="/crudevent/1"><button type="button" className="btn btn-lg" style={{backgroundColor: 'rosybrown', color:'white'}}>Events</button></Link>
    </div>
    <div className="col-4 my-5" style={{display:'flex',justifyContent:'center'}}>
    <Link to="/crudevent/2"><button type="button" className="btn btn-lg" style={{backgroundColor: 'rosybrown', color:'white'}} >Locations</button></Link>
    </div>
    <div className="col-4 my-5" style={{display:'flex',justifyContent:'center'}}>
    <Link to="/crudevent/3"><button type="button" className="btn btn-lg" style={{backgroundColor: 'rosybrown', color:'white'}}>Users</button></Link>
    </div>

    
    </div></div>
    
    
    </>);

    }






    
    export default React.memo(CRUDevent1) 
