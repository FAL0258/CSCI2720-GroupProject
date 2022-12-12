import React from 'react';
import icon from '../icon.png';
import PropTypes from 'prop-types';
import crypto from "crypto-js";

async function loginUser(datas){
    let api = "http://localhost:4000/validateDB";
    return fetch(api, { method: "post", body: datas})
     .then(data => data.json());
}

const LoginPage = () => {

    const getLoginRes = async (event, uid, upw) => {
        event.preventDefault();
        let data = new URLSearchParams();
        data.append("uId", uid);
        data.append("uPw", upw);
        
        const identity = await loginUser(data);
        console.log(identity);
        if (identity.ok == 1){
            //setUser(identity);
            
            window.sessionStorage.setItem("fakeCookie", crypto.SHA256(identity.uName).toString());
            window.sessionStorage.setItem("userName", identity.uName);
            window.sessionStorage.setItem("isAdmin", identity.isAdmin);
            window.location.replace("/");
        }
        else{
            window.alert("Invalid account");
        }

    }

    return(
        <div className="container">
            <div className="row text-center">
                <br/>
                <form>
                    <img className="mb-4" style={{border: '5px dashed rosybrown',borderRadius: 50 + 'px', width:200, height:200}} src={icon} alt="icon" /><br/>
                    <label htmlFor="uid" className="d-none">Uid</label>
                    <input type="text" id="uid" name="uId" className="form-control" style={{width:400, margin:'auto'}} placeholder="Username" required autoFocus/>

                    <label htmlFor="upw" className="d-none">Upw</label>
                    <input type="text" id="upw" name="uPw" className="form-control" style={{width:400, margin:'auto'}}  placeholder="Password" required/>
                    <br/>
                    <button className="btn btn-lg btn-block" style={{backgroundColor: 'rosybrown', color:'white'}} type="button" onClick={(e) => getLoginRes(e, document.getElementById('uid').value, document.getElementById('upw').value)}>
                    Login
                    </button>
                </form>
            </div>
        </div>
    );
}


export default React.memo(LoginPage);
