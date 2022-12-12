import React from 'react';
import icon from '../icon.png';

const LoginPage = () => {
    return(
        <div className="container">
            <div className="row text-center">
                <br/>
                <form class="form-signin">
                    <img class="mb-4" style={{border: '5px dashed rosybrown',borderRadius: 50 + 'px', width:200, height:200}} src={icon} alt="icon" /><br/>
                    
                    <label for="inputEmail" class="d-none">Email address</label>
                    <input type="email" id="inputEmail" class="form-control " placeholder="Email address" style={{width:400, margin:'auto'}} required autofocus/>
                    
                    <label for="inputPassword" class="d-none">Password</label><br/>
                    <input type="password" id="inputPassword" class="form-control" style={{width:400, margin:'auto'}}  placeholder="Password" required/>
                    
                    <div class="checkbox mb-3">
            
                    </div>
                    <button class="btn btn-lg btn-block" style={{backgroundColor: 'rosybrown', color:'white'}} type="submit">Log in</button>
                </form>
            </div>
        </div>
    );
}

export default React.memo(LoginPage);