import React from 'react';
import "./style3.css";

const LogOut = (props) => {

    const confirmLogOut = () => {
        window.confirm("Are you sure to log out?");
    }

    return(
        <div>
            <div id="topright">
                <i>{props.name}</i>
                <button type="button" id="idid" style={{backgroundColor: 'rosybrown', color:'white'}} className="btn" onClick={confirmLogOut}> logout</button>
            </div>
        </div>
    );
}

export default React.memo(LogOut);