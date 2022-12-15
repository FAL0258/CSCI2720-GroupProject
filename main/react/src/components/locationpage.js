/**
 * refs: https://stackoverflow.com/questions/12462318/find-a-value-in-an-array-of-objects-in-javascript
 */

import React from "react";
import { useParams } from "react-router-dom";
import Maps from "./map.js";
import Comment from "./comment.js";
import Event from "./event.js";
import GLB from "../config.js"
import * as grab from "./grab.js";

const locData = [ 
  { lat: 22.39181, lng: 113.976771 },
  { lat: 22.35665, lng: 114.12623 }
];

const fillerNumber = 999;

const LocationPage = (props) => {
  let ouAc=props.userAc;
  let ouName=props.username;
  console.log(props);
  let { locationId } = useParams();
  console.log(locationId);
  let locId=locationId; 
  let eventId =props.evDataSet[0].eventId; 
  
  
  const fillheart = () => {
    let special = document.querySelector("#nonfill");
    if (special.classList.contains("bi-heart")) { //if it is not filled yet, which means the heart should be filled when onClick; Added to fav
      special.classList.remove("bi-heart");
      special.classList.add("bi-heart-fill");

      let url="http://localhost:4000/addFav"+locationId;
      let obj={ userAc: ouAc, locationId: locId};
        fetch(url,{
            method:"PUT",
            headers:{
                "Content-type":  'application/x-www-form-urlencoded; charset=utf-8'
            },
            body:new URLSearchParams(obj)
           })
           .then (res=>{
            if(res.ok){console.log("PUT ok")}
            else console.log("PUT NO")
            return res;
           })
           .catch(error=>console.log(error))
    } else {
      special.classList.remove("bi-heart-fill");
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
              <Maps mapWidth="500px" mapHeight="500px" coordinates={[props.locDataSet[index].coordinates]} locationIds={[props.locDataSet[index].locationId]} center={center} zoom={15} />
            </div>
            <p>Location: {props.locDataSet[index].name}</p>
            <p>Number of Events: {props.locDataSet[index].evCount}</p>
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={fillheart}
            >
              <b>
                Add to favorite location{" "}
                <i id="nonfill" className="bi bi-heart"></i>
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
            >
              Comment
            </h2>
            {/* <Comment locId={locationId} userAc={ouAc} username={ouName} setEnd={props.setEnd}/> */}
            <Event evId={eventId} setEnd={props.setEnd}/>
          </section>
        </div>
      </div>
    </>
  );
};

export default LocationPage;
