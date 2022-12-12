import React from 'react';

const Comment = () => {
    return(
        <div className="container">
            <div className="row">
                <section id="comment" className="col-12">
                    <form>
                        <div class="mb-3">
                        </div>
                        <div class="mb-3">
                            <label for="new-comment" class="form-label">Comment</label>
                            <textarea class="form-control" id="new-comment" rows="3" required></textarea>
                        </div>
                    <button type="button" class="btn" style={{backgroundColor: 'rosybrown', color:'white'}}>Add comment</button>
                    </form>
                </section>
            </div>
        </div>
    );
}

export default React.memo(Comment);