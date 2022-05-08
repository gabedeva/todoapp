import React from 'react';
import Lottie from 'react-lottie';

import checkData from '../../_data/check-green.json';

const LottiePlayer = ({ lottieData, w, h, loop }) => {

    const defaultOptions = {
        loop: loop ? loop : false,
        autoplay: true,
        animationData: lottieData ? lottieData : checkData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }

    return(

        <>
        
            <Lottie 
                options={defaultOptions}
                height={h}
                width={w}
                isStopped={false}
                isPaused={false} 
            />
        
        </>
    )
}

export default LottiePlayer;