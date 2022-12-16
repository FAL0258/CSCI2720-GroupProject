import React, { useEffect, useState } from 'react'
import { evCount, grabEv, grabLoc, grabFav, retrieveXML } from "./grab.js";

const LoadingPage = (props) => {
    // Promise functions to Initiate everything
    // Grab from XML and then database
    console.log(props.firstLoad);
    if (props.firstLoad == null || props.firstLoad == undefined){
        let xml = retrieveXML();
        xml.then( next => {
        let ev = grabEv();
        ev
            .then(evD => {
            //console.log(evD);
            let loc = grabLoc();
            loc
                .then(locD => {
                //console.log(locD);
                let rLoc = evCount(evD, locD);
                props.setLoc(rLoc);
                props.setEv(evD);
                let rFav = grabFav(props.ouAc);
                rFav
                    .then(favD => {
                    let finalFav = evCount(evD, favD);
                    props.setFav(finalFav);
                    window.sessionStorage.setItem("firstLoad", true);
                    window.sessionStorage.setItem("lastUpdate", Date());
                    props.setEnd(1);
                    });
                });
            });
        });
    }
    // Only grab from database
    else{
        let ev = grabEv();
        ev
            .then(evD => {
            //console.log(evD);
            let loc = grabLoc();
            loc
                .then(locD => {
                //console.log(locD);
                let rLoc = evCount(evD, locD);
                props.setLoc(rLoc);
                props.setEv(evD);
                let rFav = grabFav(props.ouAc);
                rFav
                    .then(favD => {
                    let finalFav = evCount(evD, favD);
                    props.setFav(finalFav);
                    props.setEnd(1);
                    });
                });
            });
    }


    return (
        <div className="text-center" style={{ marginTop: 30 + 'vh' }}>
            <button style={{ color: 'black', width: 40 + 'vw', fontSize: 5 + 'vw', border: 2 }} className="btn" type="button" disabled>
                <span className="spinner-border spinner-border-sm" style={{ width: 1 + 'em', height: 1 + 'em' }} role="status" aria-hidden="true"></span>
                Loading...
            </button>
        </div>
    );
}

export default React.memo(LoadingPage);