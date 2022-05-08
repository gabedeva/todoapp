import React, { useEffect, useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import SEO from '../layouts/partials/SEO';


const NotFound = () => {

    const history = useHistory();

    const goBack = () => {
        history.goBack();
    }

    return(

        <>
            <SEO pageTitle="Todo - Not Found" />
            <div className="not-found">
                
                <img src="../../../images/assets/404.png" width="200px" alt="not-found" />
                <h3 className="mrgt1">Page not found!</h3>
                <Link onClick={goBack} className="btn btn-large btn-primary onwhite fs-15 mrgt">Go Back</Link>

            </div>        
        </>
    )

}

export default NotFound;