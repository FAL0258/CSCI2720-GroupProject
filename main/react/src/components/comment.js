import React from 'react';

const Comment = (props) => {
    function savefile(){ //save the comment, and send to the server
        let url="http://localhost:4000/getCm/"+props.locId;
        let obj;
        obj.author=props.username;
        obj.location=props.locId;
        obj.content=document.querySelector("#new-comment").value;
        obj.date= Date.now;
        fetch(url,{
            method:"PUT",
            headers:{
                "Content-type":  'application/x-www-form-urlencoded; charset=utf-8'
            },
            body:new URLSearchParams(obj)
           })
           .then (res=>{
            if(res.ok){console.log("PUT ok")}
            else console.log("PUT NO")
            return res
           })
           .then (res=>res.json())
           .then(data=>console.log(JSON.stringify(obj)))
           .catch(error=>console.log(error))
        
        console.log("done!")    
      }
    function loadfile(){ //fetch the comment from server
        let url="http://localhost:4000/getCm/"+props.locId;
        fetch(url).then(res=>res.text()).then (txt=>document.querySelector("#comments").innerHTML=txt);
     }
      
      window.onload = function () { //load the comment everytime the page is loaded
        loadfile();
      }
    return(
        <div className="container">
            <div className="row">
                <section id="comment" className="col-12">
                    <form>
                        <div className="mb-3">
                        </div>
                        <div className="mb-3">
                            <div id="comments"> </div>
                            <label htmlFor="new-comment" className="form-label">Comment</label>
                            <textarea className="form-control" id="new-comment" rows="3" required></textarea>
                        </div>
                    <button type="button" className="btn" style={{backgroundColor: 'rosybrown', color:'white'}} onCLick={savefile}>Add comment</button>
                 
                    </form>
                </section>
            </div>
        </div>
    );
}

export default React.memo(Comment);
