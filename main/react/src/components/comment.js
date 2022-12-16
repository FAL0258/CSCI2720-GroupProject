import React, { useState, useEffect } from 'react';
import GLB from "../config.js";

const Comment = (props) => {
    // console.log(props.userAc);
    let userAc1 = props.userAc;
    let username1 = props.username;
    const regex = /GMT.*\)$/;
    function savefile() { //save the comment, and send to the server
        //let url="http://localhost:4000/getCm/"+props.locId;
        let url = GLB.BACKEND_API + "/getCm/" + props.locId;
        let cmContent = document.querySelector("#new-comment").value;
        let obj = { author: userAc1, location: props.locId, content: cmContent };
        fetch(url, {
            method: "PUT",
            headers: {
                "Content-type": 'application/x-www-form-urlencoded; charset=utf-8'
            },
            body: new URLSearchParams(obj)
        })
            .then(res => {
                if (res.ok) { console.log("PUT ok") }
                else console.log("PUT NO")
                return res;
            })
            .catch(error => console.log(error))

        console.log("done!");
        let currentDate = new Date();
        currentDate = currentDate.toString();
        // Add temp string to show in the html first
        let str = "";
        str += '<h2><b>' + username1 + '</b></h2>';
        str += '<h5 style="color:black">' + cmContent + ' </h5>';
        //str+='<p style="color:grey; text-align: right">'+"Just Now"+'</p>';
        str += '<p style="color:grey; text-align: right">' + currentDate.replace(regex, "") + '</p>';
        str += "<hr/>";
        str += "<br/>";
        document.querySelector("#comments").innerHTML += str;
        document.querySelector("#new-comment").value = "";
        //props.setEnd(null);
    }

    function loadfile() { //fetch the comment from server
        //let url="http://localhost:4000/getCm/"+props.locId;
        let url = GLB.BACKEND_API + "/getCm/" + props.locId;
        fetch(url).then(res => res.json()).then(txt => {

            let str = "";

            for (let i = 0; i < txt.length; i++) {
                str += '<h2><b>' + txt[i].name + '</b></h2>';
                str += '<h5 style="color:black">' + txt[i].content + ' </h5>';
                str += '<p style="color:grey; text-align: right">' + txt[i].date.replace(regex, "") + '</p>';
                str += "<hr/>";
                str += "<br/>";
            }

            document.querySelector("#comments").innerHTML = str;
        })
            .catch(error => console.log(error))
    }

    function closeBtn(){
        document.querySelector("#rightTitle").innerText = "Comment";
        document.querySelector("#showevent").innerHTML = "";
        document.querySelector("#comment").style.display = "inline-block";
        document.querySelector("#evClose").style.visibility = "none";
        props.setBtnVis({visibility: "hidden"});
        window.sessionStorage.setItem("evTrigger", 0);
    }
    //load the comment everytime the page is loaded
    loadfile();
    return (
        <div className="container">
            <div className="row">
                <button id="evClose" className="" style={props.buttonVis} onClick={closeBtn}>Close</button>
                <section id="comment" className="col-12" style={{ display: "inline-block" }}>
                    <form>
                        <div className="mb-3">
                        </div>
                        <div className="mb-3">
                            <div id="comments"> </div>
                            <label htmlFor="new-comment" className="form-label">Comment</label>
                            <textarea className="form-control" id="new-comment" rows="3" required></textarea>
                        </div>
                        <button type="button" className="btn" style={{ backgroundColor: 'rosybrown', color: 'white' }} onClick={savefile}>Add comment</button>

                    </form>
                </section>
            </div>
        </div>
    );
}

export default React.memo(Comment);
