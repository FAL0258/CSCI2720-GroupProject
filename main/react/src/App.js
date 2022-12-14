import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";
//npm install @googlemaps/react-wrapper
//import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Maps from "./components/map.js";
import Tables from "./components/table.js";
import SmallerMaps from "./components/smallermap.js";
import LoginPage from "./components/loginpage.js";
import LocationPage from "./components/locationpage.js";
import SearchBox from "./components/searchbox.js";
import LogOut from "./components/logout.js";
import Comment from "./components/comment.js";
import CRUDevent from "./components/crudevent.js";
import CRUDevent1 from "./components/crudevent1.js";
import Update from "./components/update.js";
import Delete from "./components/delete.js";
import Read from "./components/read.js";
import Create from "./components/create.js";
import LoadingPage from "./components/loadingpage.js";
//npm i -S @react-google-maps/api
import "./style.css";
import GLB from "./config.js";
import {evCount, grabEv, grabLoc} from "./components/grab.js";

let data1 = [
  { loc: "Tai Po Public Library", num: "4" },
  { loc: "Sha Tin Town Hall", num: "6" },
  { loc: "Fa Yuen Street Public Library", num: "9" },
  { loc: "Fanling Public Library", num: "5" },
  { loc: "Lek Yuen Public Library", num: "10" },
  { loc: "Lung Hing Public Library", num: "7" },
  { loc: "Ngau Chi Wan Public Library", num: "8" },
  { loc: "Hong Kong Film Archive", num: "3" },
  { loc: "North Lamma Public Library", num: "4" },
  { loc: "Emperor Cinemas iSQUARE", num: "8" },
];

// Test data for map markers
const locData = [
  { lat: 22.501639, lng: 114.128911 },
  { lat: 22.39181, lng: 113.976771 },
  { lat: 22.35665, lng: 114.12623 },
  { lat: 22.44152, lng: 114.02289 },
];

let realLoc = [];

function App (props) {

  /*

  const [EvData, setEv] = useState();
  const [LocData, setLoc] = useState();
  const [end, setEnd] = useState();

  if (end == undefined || end == null){
    let ev = grabEv();
    ev
    .then(evD =>{
      //console.log(evD);
      let loc = grabLoc();
      loc
      .then(locD =>{
        //console.log(locD);
        let rLoc = evCount(evD, locD);
        setLoc(rLoc);
        setEv(evD);
        setEnd(1); 
      });
    });
  }
  else{
    // Start your code here

  }

  */
  
   //console.log("Real", realLoc);

  //console.log(bb);
  //const [userData, setUser] = useState();
  //console.log(realDATA);
  // Handling session state
  console.log(GLB.BACKEND_API);
  const ckToken = window.sessionStorage.getItem("fakeCookie");
  let oisAdmin = "false";
  let ouName = "";
  if (ckToken == null) {
    //return (<LoginPage setToken={setToken} setUser={setUser}/>)
    return <LoginPage />;
  }
  oisAdmin = window.sessionStorage.getItem("isAdmin");
  ouName = window.sessionStorage.getItem("userName");

  // Temp session
  //let oisAdmin = 'true';
  //let ouName = 'Admin';

    // Admin page
    if (oisAdmin == 'true'){
      console.log(oisAdmin);
      return (
        <BrowserRouter>
        <LogOut name={ouName}/>
        <Title name={props.name} style={{color: "red"}} />
          <div>
            
            <nav className="navbar navbar-expand-lg justify-content-center bg-light" >
            <ul className="navbar-nav"> 
            
            <Link to="/"> <li className="nav-item text-dark">Home</li></Link>
            <Link to="/table"> <li className="nav-item text-dark">Table</li></Link>
            <Link to="/map"> <li className="nav-item text-dark">Map</li></Link>
            <Link to="/favloc"> <li className="nav-item text-dark">Favorite Location</li></Link>
            <Link to="/crudevent1"> <li className="nav-item text-dark">Admin Edit</li></Link>
            
              </ul>
            </nav>
          </div>

          

          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/table" element={<Table />} />
          <Route path="/map" element={<Map />} />
          <Route path="/favloc" element={<Favloc />} />
          <Route path="/loadingpage" element={<LoadingPage />} />
          <Route
            path="/locationpage/:locationId"
            element={<LocationPage username={ouName}/>}
          />
          <Route path="/crudevent/:chosen" element={<CRUDevent />} />
          <Route path="/crudevent1" element={<CRUDevent1 />} />
          <Route path="/create/:chosen" element={<Create />} />
          <Route path="/read/:chosen" element={<Read />} />
          <Route path="/update/:chosen" element={<Update />} />
          <Route path="/delete/:chosen" element={<Delete />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </BrowserRouter>
      );
    }
    // Normal User page
    else{
      console.log(oisAdmin);
      return (
        <BrowserRouter>
        <LogOut name={ouName}/>
        <Title name={props.name} style={{color: "red"}} />
          <div>
            
            <nav className="navbar navbar-expand-lg justify-content-center bg-light" >
            <ul className="navbar-nav">
              <Link to="/">
                {" "}
                <li className="nav-item text-dark">Home</li>
              </Link>
              <Link to="/table">
                {" "}
                <li className="nav-item text-dark">Table</li>
              </Link>
              <Link to="/map">
                {" "}
                <li className="nav-item text-dark">Map</li>
              </Link>
              <Link to="/favloc">
                {" "}
                <li className="nav-item text-dark">Favorite Location</li>
              </Link>
            </ul>
          </nav>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loadingpage" element={<LoadingPage />} />
          <Route path="/table" element={<Table />} />
          <Route path="/map" element={<Map />} />
          <Route path="/favloc" element={<Favloc />} />
          <Route
            path="/locationpage/:locationId"
            element={<LocationPage />}
          />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

const NoMatch = () => {
  let location = useLocation();
  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
};

const Home = () => {
  return (
    <>
      <section>
        <div className="container">
          <div className="row">
            <h2 style={{ color: "black" }}>
              <b>
                Home<i className="bi bi-house-heart"></i>
              </b>
            </h2>
            <h3 style={{ color: "rosybrown" }}>
              Welcome to our cultural events website!
            </h3>
            <p>
              Here, you are able to check the cultural events in various
              locations in Hong Kong
            </p>
            <p>
              All locations in tables and maps are linked to single location
              pages
            </p>
            <p>
              You could view all the details there, as well as bookmark your
              favorite locations!<i className="bi bi-bookmark-heart"></i>
            </p>
            <p>Feel free to navigate around~</p>
            <p>Enjoy your journey! </p>

            <p>
              <i>source: LCSD Cultural Programmes</i>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

const Table = () => {
  return (
    <section>
      <div className="container">
        <div className="row">
          <h2>
            <b>Table</b> <i className="bi bi-table"></i>
          </h2>

          <Tables />
        </div>
      </div>
    </section>
  );
};

const Map = () => {
  return (
    <section className="justify-content-center" id="map">
      <Maps mapWidth="800px" mapHeight="600px" coordinates={locData} />
    </section>
  );
};

const Favloc = () => {
  return (
    <div className="container">
      <div className="row">
        <h2>
          <b>Your Favorite Location</b>
          <i className="bi bi-balloon-heart-fill"></i>
        </h2>
        <Tables />
      </div>
    </div>
  );
};

const Title = (props) => {
  /*these are REACT Component */

  return (
    <header>
      <h1 className="display-5 text-md-center">{props.name}</h1>
    </header>
  );
};

export default App;
