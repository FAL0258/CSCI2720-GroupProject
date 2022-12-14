import GLB from "../config.js";

let realData = [];
let realLoc = [];

function processData(datas, option) {
  if (option == "ev") {
    let jsonD = JSON.parse(datas);
    for (let i = 0; i < realLoc.length; i++){
      let count = 0;
      for (let j =0; j < jsonD.length; j++){
        if (jsonD[j].venue == realLoc[i]._id){
          count++;
        }
      }
      console.log(count);
      realLoc[i].evCount = count;
    }
    realData = jsonD;
    console.log(realData);
    console.log(realLoc);
  }
  else if (option == "loc"){
    let jsonD = JSON.parse(datas);
    realLoc = jsonD;
  }
}

export function grabEv() {
  let api = GLB.BACKEND_API + "/grabEv";
  //let api = "http://localhost:4000/grabEv";
  fetch(api)
    .then((res) => res.text())
    .then((txt) => processData(txt, "ev"))
    .catch((error) => console.log(error));
}

export function grabLoc() {
  let api = GLB.BACKEND_API + "/grabLoc";
  //let api = "http://localhost:4000/grabLoc";
  fetch(api)
    .then((res) => res.text())
    .then((txt) => processData(txt, "loc"))
    .catch((error) => console.log(error));
}

export function grabAll(){
  grabLoc();
  grabEv();
}

