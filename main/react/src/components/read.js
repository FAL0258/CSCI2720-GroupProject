import React from 'react';
import { useParams } from 'react-router-dom';
import GLB from "../config.js";

function Read(props) {
    let { chosen } = useParams();
    //form 1

    if (chosen == 1) {
        const load = (event, evId) => {
            event.preventDefault();
            //console.log(evId);
            let flag = 0;
            for (let i = 0; i < props.evDataSet.length; i++) {
                if (props.evDataSet[i].eventId.toString() == evId.toString()) {
                    let api = GLB.BACKEND_API + "/read/4/" + props.evDataSet[i].eventId;
                    fetch(api)
                        .then(response => response.json())
                        .then(json => {
                            flag = 1;
                            //console.log(json);
                            //console.log(props.evDataSet[i]);
                            document.getElementById('title').value = props.evDataSet[i].title;
                            document.getElementById('venue').value = json.name;
                            document.getElementById('date').value = props.evDataSet[i].date;
                            document.getElementById('description').value = props.evDataSet[i].description;
                            document.getElementById('presenter').value = props.evDataSet[i].presenter;
                            document.getElementById('price').value = props.evDataSet[i].price;
                        })
                        .catch(err => flag = 0);

                    return;
                }
            }
            if (flag == 0) window.alert("Event not found");
        }
        return (
            <>

                <div className="text-center">
                    <h2 style={{ background: "rosybrown", color: "white"}}>Read Event</h2>



                    <form action="" method="post">

                        <label htmlFor="eventId" style={{fontWeight:'bold',color:'rosybrown'}}>Event Id</label>
                        <input type="text" className="form-control text-center" style={{ width: 50 + "%", margin: 'auto' }}  id="eventId" name="eventId" required />
                        <br />

                        <button className="btn btn-lg btn-block" style={{ width: 50 + "%", margin: 'auto', backgroundColor: 'rosybrown', color: 'white' }} type="button" onClick={e => load(e, document.getElementById('eventId').value)}>Load Information</button>
                        <br /> <br />

                        <label htmlFor="title" style={{fontWeight:'bold',color:'rosybrown'}}>Title</label>
                        <input type="text" className="form-control text-center" style={{ width: 50 + "%", margin: 'auto' }} id="title" name="title" />
                        <br />


                        <label htmlFor="venue" style={{fontWeight:'bold',color:'rosybrown'}}>Venue</label>
                        <input type="text" className="form-control text-center" style={{ width: 50 + "%", margin: 'auto' }} id="venue" name="venue" />
                        <br />

                        <label htmlFor="date" style={{fontWeight:'bold',color:'rosybrown'}}>Date</label>
                        <input type="text" className="form-control text-center" style={{ width: 50 + "%", margin: 'auto' }}  id="date" name="date" />
                        <br />

                        <label htmlFor="description" style={{fontWeight:'bold',color:'rosybrown'}}>Description</label>
                        <textarea className="form-control text-left" style={{ width: 50 + "%", margin: 'auto', height:200+'px' }} id="description" name="description" />
                        <br />

                        <label htmlFor="presenter" style={{fontWeight:'bold',color:'rosybrown'}}>Presenter</label>
                        <input type="text" className="form-control text-center" style={{ width: 50 + "%", margin: 'auto' }}  id="presenter" name="presenter" />
                        <br />

                        <label htmlFor="price" style={{fontWeight:'bold',color:'rosybrown'}}>Price</label>
                        <input type="text" className="form-control text-center" style={{ width: 50 + "%", margin: 'auto' }} id="price" name="price" />
                        <br />



                    </form></div>
            </>
        );
    }
    //form 2  
    else if (chosen == 2) {

        const load = (event, locId) => {
            event.preventDefault();
            //console.log(locId);
            //console.log(props.locDataSet);
            for (let i = 0; i < props.locDataSet.length; i++) {
                if (props.locDataSet[i].locationId.toString() == locId.toString()) {
                    document.getElementById('name').value = props.locDataSet[i].name;
                    document.getElementById('latitude').value = props.locDataSet[i].coordinates.lat;
                    document.getElementById('longitude').value = props.locDataSet[i].coordinates.lng;
                    return;
                }
            }
            window.alert("Location not found")

        }
        return (
            <>
                <div className="text-center">
                    <h2 style={{ background: "rosybrown", color: "white", textAlign: "center" }}>Read Location</h2>


                    <form action="" method="post">

                        <label htmlFor="locationId" style={{fontWeight:'bold',color:'rosybrown'}}>Location ID</label>
                        <input type="text" className="form-control text-center" style={{ width: 50 + "%", margin: 'auto' }}  id="locationId" name="locationId" required />
                        <br />

                        <button className="btn btn-lg btn-block" style={{ width: 50 + "%", margin: 'auto', backgroundColor: 'rosybrown', color: 'white' }} type="button" onClick={e => load(e, document.getElementById('locationId').value)}>Load Information</button>
                        <br /> <br />

                        <label htmlFor="name" style={{fontWeight:'bold',color:'rosybrown'}}>Location Name</label>
                        <input type="text" className="form-control text-center" style={{ width: 50 + "%", margin: 'auto' }} id="name" name="name" />
                        <br />

                        <label htmlFor="latitude" style={{fontWeight:'bold',color:'rosybrown'}} >Latitude</label>
                        <input type="text" className="form-control text-center" style={{ width: 50 + "%", margin: 'auto' }} id="latitude" name="latitude" />
                        <br />

                        <label htmlFor="longitude" style={{fontWeight:'bold',color:'rosybrown'}}>Longitude</label>
                        <input type="text" className="form-control text-center" style={{ width: 50 + "%", margin: 'auto' }} id="longitude" name="longitude" />
                        <br />


                    </form></div>
            </>
        );
    }
    //form 3  
    else if (chosen == 3) {
        const load = (event, userAc) => {
            event.preventDefault();
            //console.log(userAc);
            let api = GLB.BACKEND_API + "/read/3/" + userAc;
            fetch(api)
                .then(response => response.json())
                .then(json => {
                    //console.log(json);
                    document.getElementById('name').value = json.name;
                    document.getElementById('password').value = json.password;
                })
                .catch(err => window.alert("User not found"));
        }
        return (
            <>
                <div className="text-center">
                    <h2 style={{ background: "rosybrown", color: "white", textAlign: "center" }}>Read User</h2>


                    <form action="" method="post">

                        <label htmlFor="userAc" style={{fontWeight:'bold',color:'rosybrown'}}>Account</label>
                        <input type="text" className="form-control text-center" style={{ width: 50 + "%", margin: 'auto' }} id="userAc" name="userAc" />
                        <br />


                        <button className="btn btn-lg btn-block" style={{ width: 50 + "%", margin: 'auto', backgroundColor: 'rosybrown', color: 'white' }} type="button" onClick={e => load(e, document.getElementById('userAc').value)}>Load Information</button>
                        <br /> <br />

                        <label htmlFor="name" style={{fontWeight:'bold',color:'rosybrown'}}>Nickname</label>
                        <input type="input" className="form-control text-center" style={{ width: 50 + "%", margin: 'auto' }} id="name" name="name" />
                        <br />

                        <label htmlFor="password" style={{fontWeight:'bold',color:'rosybrown'}}>User Password</label>
                        <input type="input" className="form-control text-center" style={{ width: 50 + "%", margin: 'auto' }} id="password" name="password" />
                        <br />


                    </form></div>
            </>
        );

    }
}



export default React.memo(Read);
