import React, { useState, useEffect } from 'react';
import GLB from "../config.js";

const EventButton = (props) => {
    // console.log(props.evName);
    // console.log(props.evId);

    window.sessionStorage.setItem("evTrigger", 0);
    const eventButton = () => {
        // Want to see event
            let eventIdArray = [];
            eventIdArray.push(props.evId);
            // console.log(props.evName);

            let index = 0;
            for (let i = 0; i < props.evDataSet.length; i++) {
                if (props.evDataSet[i].eventId == props.evId)
                    index = i;
            }
            try {
                let str = "";
                str = "eventname: " + props.evDataSet[index].title + "<br><br>" +
                    "date: " + props.evDataSet[index].date + "<br><br>" +
                    "description: " + props.evDataSet[index].description + "<br><br>" +
                    "presenter: " + props.evDataSet[index].presenter + "<br><br>" +
                    "price: " + props.evDataSet[index].price;
                document.querySelector("#showevent").innerHTML = str;
            }
            catch (error) {
                console.log(error);
            }
            document.querySelector("#rightTitle").innerText = "Event Detail";
            document.querySelector("#comment").style.display = "none";
            document.querySelector("#evClose").style.visibility = "visible";
            props.setBtnVis({visibility: "visible"});
            window.sessionStorage.setItem("evTrigger", 1);
    }

    return (
        <>
            <button type="button" onClick={eventButton}>{props.evName}</button><br></br>
        </>
    );
}

export default React.memo(EventButton);