import React from 'react';
import LottiePlayer from './LottiePlayer';
import { Link } from 'react-router-dom';

import checkData from '../../_data/check-green.json';
import checkError from '../../_data/error.json';

const Message = ({ title, message, action, type, buttonText }) => {

    const fireAction = (e) => {
        e.preventDefault();
        action();
    }

    return(

        <>
            <div className="mrgb2 mrgt2">
                <LottiePlayer 
                    w={'100px'}
                    h={'100px'}
                    loop={true}
                    lottieData={ type === 'success' ? checkData : checkError }
                /> 
            </div>

            <h3 className="fs-18 omineshaft ui-text-center">{title ? title : 'No title'}</h3>
            <p className="fs-14 omineshaft ui-text-center">{message ? message : 'No message'}</p>

            <Link onClick={(e) => fireAction(e)} className="btn btn-lg btn-block bg-silver omineshaft font-weight-bold fs-16">{buttonText ? buttonText : 'Continue'}</Link>
        </>
    )
}

export default Message