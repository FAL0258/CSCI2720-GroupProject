import React, { useState, useEffect } from 'react';
import GLB from "../config.js";

const EventButton = (props) => {
    // console.log(props.evName);
    // console.log(props.evId);

    const [trigger, setTrigger] = useState(0);

    const eventButton = () => {
        // Want to see event
        if (trigger == 0) {
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
                str = "<p><b> Eventname: </b></p>" + props.evDataSet[index].title + "<br><br>" +
                    "<p><b> Date: </b></p>" + props.evDataSet[index].date + "<br><br>" +
                    "<p><b> Description: </b></p>" + props.evDataSet[index].description + "<br><br>" +
                    "<p><b> Presenter: </b></p>" + props.evDataSet[index].presenter + "<br><br>" +
                    "<p><b> Price: </b></p>" + props.evDataSet[index].price;
                document.querySelector("#showevent").innerHTML = str;
            }
            catch (error) {
                console.log(error);
            }
            document.querySelector("#rightTitle").innerText = "Event Detail";
            document.querySelector("#commentArea").style.display = "none";

            setTrigger(1);
        } else {
            // Want to see comment
            setTrigger(0);
            document.querySelector("#rightTitle").innerText = "Comment";
            document.querySelector("#showevent").innerHTML = "";
            document.querySelector("#commentArea").style.display = "inline-block";
        }
    }

    return (
        < div style={{textAlign:'center'}}>
            <button type="button"  className="btn btn-block" style={{width:80+'%', backgroundColor: '#F7E3AF', color: '#C1666B', margin:2+'%',fontWeight:'bold'}}  onClick={eventButton}>{props.evName}</button><br></br>
        </div>
    );
}

export default React.memo(EventButton);