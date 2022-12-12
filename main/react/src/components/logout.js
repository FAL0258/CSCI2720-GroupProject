import React from 'react';
import "./style3.css";

const LogOut = () => {

    const confirmLogOut = () => {
        window.confirm("Are you sure to log out?");
    }

    return(
        <div>
            <div id="topright">
                <i>?</i>
                <button type="button" id="idid" style={{backgroundColor: 'rosybrown', color:'white'}} class="btn" onClick={confirmLogOut}> logout</button>
            </div>
        </div>
    );
}

export default React.memo(LogOut);