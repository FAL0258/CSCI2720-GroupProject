import React, { useState, useEffect } from 'react';
import GLB from "../config.js";

const EventButton = (props) => {
    console.log(props.evName);
    console.log(props.evId);

    const [temp, setEventButton] = useState([]);
    const [trigger, setTrigger] = useState(0);

    const eventButton = () => {
        // Want to see event
        if (trigger == 0) {
            let tempCon = [];
            tempCon.push(props.evId);
            setEventButton(tempCon);
            console.log(temp);
            console.log(props.evName);

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
            document.querySelector("#commentArea").style.display = "none";    

            setTrigger(1);
        }else{
            // Want to see comment
            setTrigger(0);
            document.querySelector("#rightTitle").innerText = "Comment";
            document.querySelector("#showevent").innerHTML = "";
            document.querySelector("#commentArea").style.display = "inline-block";
        }
    }

    return (
        <>
            <button type="button" onClick={eventButton}>{props.evName}</button><br></br>
            {/* {temp.map((xeventId) => ( <Event evId={xeventId} evDataSet={props.evDataSet} setEnd={props.setEnd}/> ))} */}
        </>
    );
}

export default React.memo(EventButton);