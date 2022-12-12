import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function CRUDevent (){

    return(<>
     
    <div style={{textAlign:'center'}}>
    <Link to="/create"><button type="button" class="btn " style={{backgroundColor: 'rosybrown', color:'white',margin:15}}>Create</button></Link>
    <Link to="/read"><button type="button" class="btn" style={{backgroundColor: 'rosybrown', color:'white',margin:15}}>Read</button></Link>
    <Link to="/update"><button type="button" class="btn" style={{backgroundColor: 'rosybrown', color:'white',margin:15}}>Update</button></Link>
    <Link to="/delete"><button type="button" class="btn" style={{backgroundColor: 'rosybrown', color:'white',margin:15}}>Delete</button></Link>
    </div>
    
  
    
    </>);

    }






    
    export default React.memo(CRUDevent) 
