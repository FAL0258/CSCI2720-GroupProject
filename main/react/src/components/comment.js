import React from 'react';

const Comment = (props) => {
    return(
        <div className="container">
            <div className="row">
                <section id="comment" className="col-12">
                    <form>
                        <div className="mb-3">
                        </div>
                        <div className="mb-3">
                            <label htmlFor="new-comment" className="form-label">Comment</label>
                            <textarea className="form-control" id="new-comment" rows="3" required></textarea>
                        </div>
                    <button type="button" className="btn" style={{backgroundColor: 'rosybrown', color:'white'}}>Add comment</button>
                      <h1>Location ID: {props.locId}</h1> 
                    </form>
                </section>
            </div>
        </div>
    );
}

export default React.memo(Comment);
