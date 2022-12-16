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
import { evCount, grabEv, grabLoc, grabFav, retrieveXML } from "./components/grab.js";


function App(props) {
  const [evData, setEv] = useState();
  const [locData, setLoc] = useState();
  const [favData, setFav] = useState([]);
  const [end, setEnd] = useState();


  // Handling session state for login
  console.log(GLB.BACKEND_API);
  const ckToken = window.sessionStorage.getItem("fakeCookie");
  let oisAdmin = "false";
  let ouName = "";
  let ouAc = "";
  // Prompt to Loginpage
  if (ckToken == null) {
    //return (<LoginPage setToken={setToken} setUser={setUser}/>)
    return <LoginPage />;
  }
  oisAdmin = window.sessionStorage.getItem("isAdmin");
  ouName = window.sessionStorage.getItem("userName");
  ouAc = window.sessionStorage.getItem("userAc");


  // Temp session
  //let oisAdmin = 'true';
  //let ouName = 'Admin';

  // Promise functions to Initiate everything
  if (end == undefined || end == null) {
    //let xml = retrieveXML();
    //xml.then( next => {
      let ev = grabEv();
      ev
        .then(evD => {
          //console.log(evD);
          let loc = grabLoc();
          loc
            .then(locD => {
              //console.log(locD);
              let rLoc = evCount(evD, locD);
              setLoc(rLoc);
              setEv(evD);
              let rFav = grabFav(ouAc);
              rFav
                .then(favD => {
                  let finalFav = evCount(evD, favD);
                  setFav(finalFav);
                  setEnd(1);
                });
            });
        });
    //});
  }
  // Only all those promise functions are resolved and start rendering everything
  else {
    // Admin page
    if (oisAdmin == "true") {
      console.log("Admin: ", oisAdmin);
      // console.log(evData);
      return (
        <BrowserRouter>
          <LogOut name={ouName} />
          <Title name={props.name} style={{ color: "red" }} />
          <div>
            <nav className="navbar navbar-expand-lg justify-content-center bg-light">
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
                <Link to="/crudevent1">
                  {" "}
                  <li className="nav-item text-dark">Admin Edit</li>
                </Link>
              </ul>
            </nav>
          </div>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/table" element={<Table locDataSet={locData} />} />
            <Route path="/map" element={<Map locDataSet={locData} />} />
            <Route path="/favloc" element={<Favloc favDataSet={favData} />} />
            <Route path="/loadingpage" element={<LoadingPage />} />
            <Route
              path="/locationpage/:locationId"
              element={<LocationPage locDataSet={locData} evDataSet={evData} favDataSet={favData} username={ouName} userAc={ouAc} setEnd={setEnd} />}
            />
            <Route path="/crudevent/:chosen" element={<CRUDevent />} />
            <Route path="/crudevent1" element={<CRUDevent1 />} />
            <Route path="/create/:chosen" element={<Create setEnd={setEnd} />} />
            <Route path="/read/:chosen" element={<Read evDataSet={evData} locDataSet={locData} />} />
            <Route path="/update/:chosen" element={<Update evDataSet={evData} locDataSet={locData} setEnd={setEnd} />} />
            <Route path="/delete/:chosen" element={<Delete setEnd={setEnd} />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </BrowserRouter>
      );
    }
    // Normal User page
    else {
      console.log("Admin: ", oisAdmin);
      return (
        <BrowserRouter>
          <LogOut name={ouName} />
          <Title name={props.name} style={{ color: "red" }} />
          <div>
            <nav className="navbar navbar-expand-lg justify-content-center bg-light">
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
            <Route path="/table" element={<Table locDataSet={locData} />} />
            <Route path="/map" element={<Map locDataSet={locData} />} />
            <Route path="/favloc" element={<Favloc favDataSet={favData} />} />
            <Route
              path="/locationpage/:locationId"
              element={<LocationPage locDataSet={locData} evDataSet={evData} favDataSet={favData} userAc={ouAc} username={ouName} setEnd={setEnd} />}
            />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </BrowserRouter>
      );
    }
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

const Table = (props) => {
  return (
    <section>
      <div className="container">
        <div className="row">
          <h2>
            <b>Table</b> <i className="bi bi-table"></i>
          </h2>

          <Tables locDataSet={props.locDataSet} />
        </div>
      </div>
    </section>
  );
};

const Map = (props) => {
  let coords = [];
  let locationIds = [];
  for (let i = 0; i < props.locDataSet.length; i++) {
    coords.push({
      lat: props.locDataSet[i].coordinates.lat,
      lng: props.locDataSet[i].coordinates.lng
    });
    locationIds.push({
      locationId: props.locDataSet[i].locationId
    });
  }
  return (
    <section className="justify-content-center" id="map">
      <Maps mapWidth="800px" mapHeight="600px" coordinates={coords} locationIds={locationIds} />
    </section>
  );
};

const Favloc = (props) => {
  return (
    <div className="container">
      <div className="row">
        <h2>
          <b>Your Favorite Location</b>
          <i className="bi bi-balloon-heart-fill"></i>
        </h2>
        <Tables locDataSet={props.favDataSet} />
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