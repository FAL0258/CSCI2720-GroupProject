import React, {useState} from 'react';
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
import CRUDevent1 from "./components/crudevent1.js"
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
    //const [userData, setUser] = useState();

    // Handling session state 
    /*
    const ckToken = window.sessionStorage.getItem("fakeCookie");
    let oisAdmin = false;
    let ouName = "";
    if (ckToken == null){
      //return (<LoginPage setToken={setToken} setUser={setUser}/>)
      return (<LoginPage />)
    }
    oisAdmin = window.sessionStorage.getItem("isAdmin");
    ouName = window.sessionStorage.getItem("userName");
    */
    
    // Temp session
    let oisAdmin = 'true';
    let ouName = 'Admin';

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
                    
            <Route path="/locationpage/:index" element={<LocationPage />} />
             <Route path="/crudevent/:chosen" element={<CRUDevent />} />
          <Route path="/crudevent1" element={<CRUDevent1  />} />
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
            
            <Link to="/"> <li className="nav-item text-dark">Home</li></Link>
            <Link to="/table"> <li className="nav-item text-dark">Table</li></Link>
            <Link to="/map"> <li className="nav-item text-dark">Map</li></Link>
            <Link to="/favloc"> <li className="nav-item text-dark">Favorite Location</li></Link>
            
              </ul>
            </nav>
          </div>

          

          <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/table" element={<Table />} />
            <Route path="/map" element={<Map />} />
            <Route path="/favloc" element={<Favloc />} />
            <Route path="/locationpage/:index" element={<LocationPage />} />
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
}



const Home = () => {

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


const Table = () => {
  
    
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


const LocationPage = () => {
    let {index} = useParams();
    const fillheart = () => {
      
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
      <Link to="/crudevent"><button type="button" className="btn btn-outline-danger"> Edit</button>      </Link>
      <div id="smallermap"><SmallerMaps/></div>
      <p>Location: {data1[index].loc}</p>
      <p>Number of Events: {data1[index].num}</p>
      <button type="button" className="btn btn-outline-danger" onClick={fillheart} ><b>Add to favorite location <i id="nonfill" className="bi bi-heart"></i></b></button>
      
      </section>
      <section className="col-sm-12 col-md-6 col-log-6" style={{background:"lavenderblush", color:"rosybrown"}}>
      <h2 style={{background:"rosybrown", color:"white", textAlign:"center"}}>Comment</h2>
      <Comment/>
      </section>
      </div></div>
      </>

    );
  }



const Map = () => {

  return(<section className="justify-content-center" id="map"><Maps /></section>);
}
 
  






const Favloc = () => {

  return ( 
  <div className="container">
  <div className="row">
          <h2><b>Your Favorite Location</b><i className="bi bi-balloon-heart-fill"></i></h2>
          <Tables/>
      </div></div>
      );
  
}

const Adminedit = () => {

    return (
    <>
    <h2><b>Admin</b></h2>
    
    </>
    );
    
  
  
  }


const Title = (props) => { /*these are REACT Component */

  return ( 
      <header> 
          <h1 className="display-5 text-md-center">{props.name}</h1>
      </header> 
      );
  }


export default App;

/*
DB in node js
  app.post('/validateDB', async (req, res) => {
    let uid = req.body["uId"];
    let upw = req.body["uPw"];
    //let un = req.body["name"];
    //let enc = Bcrypt.hashSync(upw);
    //ac&pw: admin admin, user1 user1
    let validated = false;
    const result = await User.findOne({ userId: uid});
    if (result !== null){
      validated = Bcrypt.compareSync(upw, result.password);
    }
    console.log(res.body);
    console.log(validated);
    if (validated){
      let output = {uName: result.name, isAdmin: result.isAdmin, ok: 1};
      res.send(JSON.stringify(output));
    }
    else{
      res.send(JSON.stringify({ok: 0}));
    }
  });
*/