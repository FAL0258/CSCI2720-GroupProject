import { resolvePath } from "react-router";
import GLB from "../config.js";

function processData(datas, option) {
  let realData = [];
  let realLoc = [];
  if (option == "ev") {
    let jsonD = JSON.parse(datas);
    realData = jsonD;
    return realData;
  }
  else if (option == "loc") {
    let jsonD = JSON.parse(datas);
    realLoc = jsonD;
    return realLoc;
  }
}

function evCount(ev, loc) {
  let tempLoc = loc;
  for (let i = 0; i < loc.length; i++) {
    let count = 0;
    for (let j = 0; j < ev.length; j++) {
      if (ev[j].venue == loc[i]._id) {
        count++;
      }
    }
    //console.log(count);
    tempLoc[i].evCount = count;
  }
  return tempLoc;
}

function grabEv() {
  let api = GLB.BACKEND_API + "/grabEv";
  //let api = "http://localhost:4000/grabEv";
  return new Promise(resolve => {
    fetch(api)
      .then((res) => res.text())
      .then((txt) => {
        let result = processData(txt, "ev");
        resolve(result);
      })
      .catch((error) => console.log(error));
  });
}

function grabLoc() {
  let api = GLB.BACKEND_API + "/grabLoc";
  //let api = "http://localhost:4000/grabLoc";
  return new Promise(resolve => {
    fetch(api)
      .then((res) => res.text())
      .then((txt) => {
        txt = processData(txt, "loc");
        resolve(txt);
      })
      .catch((error) => console.log(error));
  });
}

function grabFav(userAc) {
  let api = GLB.BACKEND_API + "/grabFav/" + userAc;
  //let api = "http://localhost:4000/grabLoc";
  return new Promise(resolve => {
    fetch(api)
      .then((res) => res.json())
      .then((txt) => {
        // console.log(txt);
        resolve(txt);
      })
      .catch((error) => console.log(error));
  });
}

export { grabEv, grabLoc, grabFav, evCount, processData }

