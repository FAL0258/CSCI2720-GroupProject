import React from "react";
import { useParams } from "react-router-dom";
import Maps from "./map.js";
import Comment from "./comment.js";

const locData = [
  { lat: 22.501639, lng: 114.128911 },
  { lat: 22.39181, lng: 113.976771 },
  { lat: 22.35665, lng: 114.12623 },
  { lat: 22.44152, lng: 114.02289 },
];

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

const LocationPage = () => {
  let { index } = useParams();
  const fillheart = () => {
    let special = document.querySelector("#nonfill");
    if (special.classList.contains("bi-heart")) {
      special.classList.remove("bi-heart");
      special.classList.add("bi-heart-fill");
    } else {
      special.classList.remove("bi-heart-fill");
      special.classList.add("bi-heart");
    }
  };

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
              <Maps mapWidth="500px" mapHeight="500px" coordinates={locData} />
            </div>
            <p>Location: {data1[index].loc}</p>
            <p>Number of Events: {data1[index].num}</p>
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
            <Comment />
          </section>
        </div>
      </div>
    </>
  );
};

export default LocationPage;
