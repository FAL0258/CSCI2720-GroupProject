import React from 'react';
import { useParams } from 'react-router-dom';
import GLB from "../config.js";

function Update(props) {
    let { chosen } = useParams();
    //form 1 = update events
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
                            // console.log(json);
                            //console.log(props.evDataSet[i]);
                            document.getElementById('title').value = props.evDataSet[i].title;
                            document.getElementById('venue').value = json.locationId;
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

        const update = (event, evId, evTitle, evVenue, evDate, des, pre, price) => {
            event.preventDefault();
            let data = new URLSearchParams();
            let api = GLB.BACKEND_API + "/update/1";
            data.append("eventId", evId);
            data.append("title", evTitle);
            data.append("locationId", evVenue);
            data.append("date", evDate);
            data.append("description", des);
            data.append("presenter", pre);
            data.append("price", price);

            fetch(api, { method: "post", body: data })
                .then(res => res.text())
                .then(data => {
                    // console.log(data);
                    window.alert(data);
                    if (data.indexOf("Updated") != -1) {
                        props.setEnd(null);
                    }
                })
                .catch(err => console.log(err));
        }

        return (
            <>

                <div className="text-center">
                    <h2 style={{ background: "rosybrown", color: "white", textAlign: "center" }}>Update Event</h2>



                    <form>

                        <label htmlFor="eventId">Event Id</label>
                        <input type="text" className="form-control text-center" style={{ width: 50 + "%", margin: 'auto' }} id="eventId" name="eventId" required />
                        <br />


                        <button className="btn btn-lg btn-block" style={{ width: 50 + "%", margin: 'auto', backgroundColor: 'rosybrown', color: 'white' }} type="button" onClick={e => load(e, document.getElementById('eventId').value)}>Load Information</button>
                        <br /> <br />

                        <label htmlFor="title">Title</label>
                        <input type="text" className="form-control text-center" style={{ width: 50 + "%", margin: 'auto' }} id="title" name="title" />
                        <br />


                        <label htmlFor="venue">Venue</label>
                        <input type="text" className="form-control text-center" style={{ width: 50 + "%", margin: 'auto' }} id="venue" name="venue" />
                        <br />

                        <label htmlFor="date">Date</label>
                        <input type="text" className="form-control text-center" style={{ width: 50 + "%", margin: 'auto' }} id="date" name="date" />
                        <br />

                        <label htmlFor="description">Description</label>
                        <textarea className="form-control" style={{ width: 50 + "%", margin: 'auto', height:200+'px'}}  id="description" name="description" />
                        <br />

                        <label htmlFor="presenter">Presenter</label>
                        <input type="text" className="form-control text-center" style={{ width: 50 + "%", margin: 'auto' }} id="presenter" name="presenter" />
                        <br />

                        <label htmlFor="price">Price</label>
                        <input type="text" className="form-control text-center" style={{ width: 50 + "%", margin: 'auto' }}  id="price" name="price" />
                        <br />


                        <button className="btn btn-lg btn-block" style={{ width: 50 + "%", margin: 'auto', backgroundColor: 'rosybrown', color: 'white' }} type="button" onClick={e => update(
                            e,
                            document.getElementById('eventId').value, document.getElementById('title').value,
                            document.getElementById('venue').value, document.getElementById('date').value,
                            document.getElementById('description').value, document.getElementById('presenter').value,
                            document.getElementById('price').value)}>Update</button>
                    </form></div>
            </>
        );
    }
    //form 2  = update location
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

        const update = (event, locId, locName, locLat, locLng) => {
            event.preventDefault();
            let data = new URLSearchParams();
            let api = GLB.BACKEND_API + "/update/2";
            data.append("locationId", locId);
            data.append("name", locName);
            data.append("latitude", locLat);
            data.append("longitude", locLng);


            fetch(api, { method: "post", body: data })
                .then(res => res.text())
                .then(data => {
                    // console.log(data);
                    window.alert(data);
                    if (data.indexOf("Updated") != -1) {
                        props.setEnd(null);
                    }
                })
                .catch(err => console.log(err));
        }

        return (
            <>
                <div className="text-center">
                    <h2 style={{ background: "rosybrown", color: "white", textAlign: "center" }}>Update Location</h2>


                    <form>

                        <label htmlFor="locationId">Location ID</label>
                        <input type="text" className="form-control text-center" style={{ width: 50 + "%", margin: 'auto' }}  id="locationId" name="locationId" required />
                        <br />

                        <button className="btn btn-lg btn-block" style={{ width: 50 + "%", margin: 'auto', backgroundColor: 'rosybrown', color: 'white' }} type="button" onClick={e => load(e, document.getElementById('locationId').value)}>Load Information</button>
                        <br /> <br />

                        <label htmlFor="name">Location Name</label>
                        <input type="text" className="form-control text-center" style={{ width: 50 + "%", margin: 'auto' }}  id="name" name="name" />
                        <br />

                        <label htmlFor="latitude">Latitude</label>
                        <input type="text" className="form-control text-center" style={{ width: 50 + "%", margin: 'auto' }} id="latitude" name="latitude" />
                        <br />

                        <label htmlFor="longitude">Longitude</label>
                        <input type="text" className="form-control text-center" style={{ width: 50 + "%", margin: 'auto' }}  id="longitude" name="longitude" />
                        <br />

                        <button className="btn btn-lg btn-block" style={{ width: 50 + "%", margin: 'auto', backgroundColor: 'rosybrown', color: 'white' }} type="button" onClick={e => update(e, document.getElementById('locationId').value, document.getElementById('name').value,
                            document.getElementById('latitude').value, document.getElementById('longitude').value
                        )}>Update</button>
                    </form></div>
            </>
        );
    }
    //form 3 = update users
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
                    //document.getElementById('password').value = json.password;
                })
                .catch(err => window.alert("User not found"));
        }
        const update = (event, userAc, name, password) => {
            event.preventDefault();
            let data = new URLSearchParams();
            let api = GLB.BACKEND_API + "/update/3";
            data.append("userAc", userAc);
            data.append("name", name);
            data.append("password", password);

            fetch(api, { method: "post", body: data })
                .then(res => res.text())
                .then(data => {
                    // console.log(data);
                    window.alert(data);
                    if (data.indexOf("Updated") != -1) {
                        props.setEnd(null);
                    }
                })
                .catch(err => console.log(err));
        }

        return (
            <>
                <div className="text-center">
                    <h2 style={{ background: "rosybrown", color: "white", textAlign: "center" }}>Update User</h2>


                    <form>

                        <label htmlFor="userAc">Account</label>
                        <input type="text" className="form-control text-center" style={{ width: 50 + "%", margin: 'auto' }}  id="userAc" name="userAc" />
                        <br />


                        <button className="btn btn-lg btn-block" style={{ width: 50 + "%", margin: 'auto', backgroundColor: 'rosybrown', color: 'white' }} type="button" onClick={e => load(e, document.getElementById('userAc').value)}>Load Information</button>
                        <br /> <br />

                        <label htmlFor="name">User Name</label>
                        <input type="input" className="form-control text-center" style={{ width: 50 + "%", margin: 'auto' }} id="name" name="name" />
                        <br />
                        <label htmlFor="password" className="d-none">User Password</label>
                        <input type="password" className="form-control text-center" style={{ width: 50 + "%", margin: 'auto' }} placeholder="Update Password Here" id="password" name="password" />
                        <br />

                        <button className="btn btn-lg btn-block" style={{ width: 50 + "%", margin: 'auto', backgroundColor: 'rosybrown', color: 'white' }} type="button" onClick={e => update(e, document.getElementById('userAc').value, document.getElementById('name').value, document.getElementById('password').value)}>Update</button>
                    </form></div>
            </>
        );

    }
}
export default React.memo(Update) 
