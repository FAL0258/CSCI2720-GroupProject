import React from 'react';
import icon from '../icon.png';

const LoginPage = () => {

    const getLoginRes = (event, uid, upw) => {
        let data = new URLSearchParams();
        let api = "http://localhost:4000/validateDB";
        data.append("uId", uid);
        data.append("uPw", upw);
        
        //ac&pw: admin admin, user1 user1
        fetch(api, { method: "post", body: data })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log("?"));
    }

    return(
        <div className="container">
            <div className="row text-center">
                <br/>
                <form>
                    <img className="mb-4" style={{border: '5px dashed rosybrown',borderRadius: 50 + 'px', width:200, height:200}} src={icon} alt="icon" /><br/>
                    <label for="uid" className="d-none">Uid</label>
                    <input type="text" id="uid" name="uId" className="form-control" style={{width:400, margin:'auto'}} placeholder="Username" required autofocus/>

                    <label for="upw" className="d-none">Upw</label>
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
