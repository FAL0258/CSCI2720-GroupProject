import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useParams, useLocation } from 'react-router-dom';
//npm install @googlemaps/react-wrapper
//import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Maps from "./components/map.js"
import Tables from "./components/table.js"
import SmallerMaps from "./components/smallermap.js"
import LoginPage from "./components/loginpage.js"
import SearchBox from "./components/searchbox.js"
import LogOut from "./components/logout.js"
import Comment from "./components/comment.js"
import CRUDevent from "./components/crudevent.js"
import Update from "./components/update.js"
import Delete from "./components/delete.js"
import Read from "./components/read.js"
import Create from "./components/create.js"
//npm i -S @react-google-maps/api
import "./style.css"   

  let data1 = [
    {loc: "Tai Po Public Library", num: "4"},{loc: "Sha Tin Town Hall", num: "6"},{loc: "Fa Yuen Street Public Library", num: "9"},{loc: "Fanling Public Library", num: "5"},
    {loc: "Lek Yuen Public Library", num: "10"},{loc: "Lung Hing Public Library", num: "7"},{loc: "Ngau Chi Wan Public Library", num: "8"},{loc: "Hong Kong Film Archive", num: "3"},
    {loc: "North Lamma Public Library", num: "4"},{loc: "Emperor Cinemas iSQUARE", num: "8"}
     ];


  

function App (props){
  
    return (
      <BrowserRouter>
      <LogOut/>
      <Title name={props.name} style={{color: "red"}} />
        <div>
          
          <nav className="navbar navbar-expand-lg justify-content-center bg-light" >
          <ul class="navbar-nav"> 
          
          <Link to="/home"> <li className="nav-item text-dark">Home</li></Link>
          <Link to="/table"> <li className="nav-item text-dark">Table</li></Link>
          <Link to="/map"> <li className="nav-item text-dark">Map</li></Link>
          <Link to="/favloc"> <li className="nav-item text-dark">Favorite Location</li></Link>
          <Link to="/adminedit"> <li className="nav-item text-dark">Admin Edit</li></Link>
          
             </ul>
          </nav>
        </div>

        

        <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
          <Route path="/table" element={<Table />} />
          <Route path="/map" element={<Map />} />
          <Route path="/favloc" element={<Favloc />} />
          <Route path="/adminedit" element={<Adminedit />} />
       
          <Route path="/locationpage/:index" element={<LocationPage />} />
          <Route path="/crudevent" element={<CRUDevent />} />
          <Route path="/create" element={<Create />} />
        <Route path="/read" element={<Read />} />
          <Route path="/update" element={<Update />} />
          <Route path="/delete" element={<Delete />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    );
  }


function NoMatch() {
  let location = useLocation();
  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}



function Home () {

    return (
    <>
    <div className="container">
      <div className="row">
    <h2 id="homes"><b>Home</b></h2>
    
    </div></div>
    <footer>This webpage is built by CSCI2720 Group 1</footer>
    </>
    );
  }


function Table (){
  
    
  return (
    <div className="container">
        <div className="row">
      
        <h2><b>Table</b></h2>
        
        <section className="col-sm-5 col-md-5 col-lg-5">
        <SearchBox/><br/>
    <Tables/>

    </section>
    </div>
    </div>
       );
  }


function LocationPage() {
    let {index} = useParams();
    function fillheart() {
      
      let special = document.querySelector("#nonfill")
      if (special.classList.contains("bi-heart")) {
        special.classList.remove("bi-heart")
        special.classList.add("bi-heart-fill")
      } else {
        special.classList.remove("bi-heart-fill")
        special.classList.add("bi-heart")
      }
    }

    
   
    return(
      <>
      <div className="container">
      <div className="row">
      <section className="col-sm-12 col-md-6 col-log-6" id="fav" style={{background:"lightgoldenrodyellow"}}>
      <h2 style={{background:"rosybrown", color:"white", textAlign:"center"}}>Location Detail</h2>
      <Link to="/crudevent"><button type="button" class="btn btn-outline-danger"> Edit</button>      </Link>
      <div id="smallermap"><SmallerMaps/></div>
      <p>Location: {data1[index].loc}</p>
      <p>Number of Events: {data1[index].num}</p>
      <button type="button" class="btn btn-outline-danger" onClick={fillheart} ><b>Add to favorite location <i id="nonfill" class="bi bi-heart"></i></b></button>
      
      </section>
      <section className="col-sm-12 col-md-6 col-log-6" style={{background:"lavenderblush", color:"rosybrown"}}>
      <h2 style={{background:"rosybrown", color:"white", textAlign:"center"}}>Comment</h2>
      <Comment/>
      </section>
      </div></div>
      </>

    );
  }



function Map (){

  return(<section className="justify-content-center" id="map"><Maps /></section>);
}
 
  






function Favloc () {

  return ( 
  <div className="container">
  <div className="row">
          <h2><b>Your Favorite Location</b><i class="bi bi-balloon-heart-fill"></i></h2>
          <Tables/>
      </div></div>
      );
  
}

function Adminedit () {

    return (
    <>
    <h2><b>Admin</b></h2>
    
    </>
    );
    
  
  
  }


function Title (props) { /*these are REACT Component */

  return ( 
      <header> 
          <h1 className="display-5 text-md-center">{props.name}</h1>
      </header> 
      );
  }





export default App;
