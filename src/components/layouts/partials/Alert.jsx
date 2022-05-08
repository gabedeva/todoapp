import React from 'react';

const Alert = ({ show, type, message }) => {

    return(
        <>
            <div className={`alert alert-${type ? type : 'info'} d-flex ${show === false ? 'ui-hide' : ''}`}>
                <div className="fs-14">
                    { message ? message : 'No Message'}
                </div>
            </div>
        </>
    )
}

export default Alert;