import React, { useEffect, useState } from 'react';
import DropSelect from './DropSelect';

const CountrySearch = ({ options, defaultValue, selected, className }) => {

    const getOptions = () => {
        return options;
    }

    const getDefault = () => {

        if(defaultValue && typeof(defaultValue) === 'object'){
            return defaultValue;
        }else if(defaultValue && typeof(defaultValue) === 'number'){
            return options ? options(defaultValue) : null;
        }

    }

    const onSelectChange = (val) => {
        return selected(val);
    }

    return(
        <>
        
            <DropSelect  
                options={options}   
                optionDisplayImage={true} 
                optionDisplayLabel={true}
                optionDisplayLeft={true}
                controlDisplayImage={true}
                controlDisplayLabel={true}
                controlDisplayLeft={true}
                onChange={(item) => onSelectChange(item)}
                defaultValue={getDefault()}
                className={className ? className : ''}
                disableSeparator={true}
               
            />
        
        </>
    )
}

export default CountrySearch;