import React from 'react';

const LoadingPage = () => {
    return (
        <div className="text-center" style={{ marginTop: 30 + 'vh' }}>
            <button style={{ color: 'black', width: 40 + 'vw', fontSize: 5 + 'vw', border: 2 }} className="btn" type="button" disabled>
                <span class="spinner-border spinner-border-sm" style={{ width: 1 + 'em', height: 1 + 'em' }} role="status" aria-hidden="true"></span>
                Loading...
            </button>
        </div>
    );
}

export default React.memo(LoadingPage);