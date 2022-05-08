import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

const Friend = ({ name, email, photo }) => {

    return(

        <>
            
            <div className="frnd-box">

                <div>
                    <img src={photo ? photo : "../../../images/assets/avatar.svg"} />
                </div>

                <div className="pdl">
                    <h3 className="mrgb0 fs-14 omineshaft font-weight-medium">{name ? name : 'No name'}</h3>
                    <p className="mrgb0 fs-12 onsilver font-weight-medium">{email ? email : 'No email'}</p>
                </div>

                <div className="ml-auto">
                    <div className="fe fe-chevron-right fs-15 onsilver"></div>
                </div>

            </div>


        </>
    )
}

export default Friend;