/**
 * refs: https://stackoverflow.com/questions/12462318/find-a-value-in-an-array-of-objects-in-javascript
 */

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Maps from "./map.js";
import Comment from "./comment.js";
import EventButton from "./eventbutton.js";
import GLB from "../config.js"
import * as grab from "./grab.js";

const locData = [
  { lat: 22.39181, lng: 113.976771 },
  { lat: 22.35665, lng: 114.12623 }
];

const fillerNumber = 999;

const LocationPage = (props) => {
  const [isFav, setisFav] = useState(null);
  const [buttonVis, setBtnVis] = useState({visibility: "hidden"});
  let ouAc = props.userAc;
  let ouName = props.username;
  // console.log(props);
  let { locationId } = useParams();
  // console.log(locationId);
  let locId = locationId;
  let eventId = props.evDataSet[0].eventId;

  if (isFav == null || isFav == undefined) {
    setisFav("bi-heart");
    for (let i = 0; i < props.favDataSet.length; i++) {
      setisFav("bi-heart");
      if (props.favDataSet[i].locationId == locationId) {
        setisFav("bi-heart-fill");
        break;
      }
    }
  }


  const fillheart = () => {
    let special = document.querySelector("#nonfill");
    //let url="http://localhost:4000/addFav/"+locId;
    let url = GLB.BACKEND_API + "/addFav/" + locId;
    let obj = { userAc: ouAc, locationId: locId };
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": 'application/x-www-form-urlencoded; charset=utf-8'
      },
      body: new URLSearchParams(obj)
    })
      .then(res => {
        if (res.ok) {
          console.log("PUT ok");
          props.setEnd(null);
        }
        else console.log("PUT NO")
        return res;
      })
      .catch(error => console.log(error))
    if (special.classList.contains("bi-heart")) { //if it is not filled yet, which means the heart should be filled when onClick; Added to fav
      special.classList.remove("bi-heart");
      special.classList.add("bi-heart-fill");


    } else {
      special.classList.remove("bi-heart-fill"); //heart is not filled, delete favloc
      special.classList.add("bi-heart");

    }
  };

  let center = {
    lat: 0,
    lng: 0
  };

  let index = 0;
  for (let i = 0; i < props.locDataSet.length; i++) {
    if (props.locDataSet[i].locationId == locationId) {
      center = {
        lat: props.locDataSet[i].coordinates.lat,
        lng: props.locDataSet[i].coordinates.lng
      };
      index = i;
    }
  }

  const [passEventId, setPassEventId] = useState([]);
  const [passEventName, setPassEventName] = useState([]);
  const [triggerButton, setTriggerButton] = useState();

  //Flag for disable minimap's redirect function
  const [flag, setFlag] = useState(true);

  const eventButton = () => {
    let url = GLB.BACKEND_API + "/read/5/" + locId;

    fetch(url)
      .then(response => response.json())
      .then(json => {
        let str = "";
        let eventButtonArray = [];
        let eventNameArray = [];
        for (let i = 0; i < json.length; i++) {
          eventButtonArray.push(json[i].eventId);
          eventNameArray.push(json[i].title);
          // str+=<Event evId={eventId} evDataSet={props.evDataSet} setEnd={props.setEnd}/> 
          // str+='<button onClick={showEventDetail}>' +  json[i].title + '</button><br>';
        }
        // console.log(json);

        setPassEventId(eventButtonArray);
        setPassEventName(eventNameArray);
        // console.log(passEventName);

        // document.querySelector("#eventlist").innerHTML=str;
      })
      .catch(err => console.log(err));
    console.log("Done");
  }
  if (triggerButton == null) {
    eventButton();
    setTriggerButton(1);
  }
  // console.log(passEventId);
  return (
    <>
      <div className="container">
        <div className="row">
          <section
            className="col-sm-12 col-md-6 col-log-6"
            id="fav"
            style={{ background: "lightgoldenrodyellow" }}
          >
            <h2
              style={{
                background: "rosybrown",
                color: "white",
                textAlign: "center",
              }}
            >
              Location Detail
            </h2>

            <div id="smallermap">
              <Maps mapWidth="500px" mapHeight="500px" coordinates={[props.locDataSet[index].coordinates]} locationIds={[props.locDataSet[index].locationId]} center={center} zoom={15} flag={flag}/>
            </div>
            <p>Location: {props.locDataSet[index].name}</p>
            <p>Number of Events: {props.locDataSet[index].evCount}</p>
            <div id="eventlist" className="wrapper " > 
            {passEventId.map((xeventId, i) => (<EventButton index={i} evId={xeventId} evName={passEventName[i]} evDataSet={props.evDataSet} setEnd={props.setEnd} setBtnVis={setBtnVis}/>))}
            </div>
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={fillheart}
            >
              <b>
                Add to favorite location{" "}
                <i id="nonfill" className={isFav}></i>
              </b>
            </button>
          </section>
          <section
            className="col-sm-12 col-md-6 col-log-6"
            style={{ background: "lavenderblush", color: "rosybrown" }}
          >
            <h2
              style={{
                background: "rosybrown",
                color: "white",
                textAlign: "center",
              }}
              id="rightTitle"
            >
              Comment
            </h2>
            <Comment locId={locationId} userAc={ouAc} username={ouName} setEnd={props.setEnd} buttonVis={buttonVis} setBtnVis={setBtnVis}/>
            <p></p>
            <div id="showevent"  > </div>
            {/* <Event evId={eventId} evDataSet={props.evDataSet} setEnd={props.setEnd}/> */}
          </section>
        </div>
      </div>
    </>
  );
};

export default LocationPage;
