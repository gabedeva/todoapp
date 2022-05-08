import React, {useReducer} from 'react';
import Axios from 'axios';
import CountryContext from './countryContext';
import CountryReducer from './countryReducer';
import { 
    GET_COUNTRIES, 
    GET_COUNTRY, 
    GET_IP_ADDRESS,
    SET_LOADING 
} from '../types';
import ip from '../../components/helpers/Ip';

const CountryState = props => {

    const initialState = {
        countries: [],
        country: {},
        ipData: {},
        loading: false
    }

    const [state, dispatch] = useReducer(CountryReducer, initialState);

    const getCountries = async(limit) => {
        setLoading();

        await Axios.get(`${process.env.REACT_APP_RESOURCE_URL}/countries?${limit ? `limit=`+limit: ''}&sort=-desc`)
        .then((resp) => {
            dispatch({
                type: 
                GET_COUNTRIES, 
                payload: resp.data.data
            })
            
        }).catch((err) => {
            console.log(`Could not get countries, ${err}`)
        })

    }

    const getIpAddress = () => {
        setLoading();

        ip.getAddress()
        .then((resp) => {
            
            dispatch({
                type: GET_IP_ADDRESS,
                payload: resp
            })
            console.log(resp);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const setLoading = () => dispatch({type: SET_LOADING});

    return <CountryContext.Provider
        value={{
            countries: state.countries,
            country: state.country,
            ipData: state.ipData,
            loading: state.loading,
            getCountries,
            getIpAddress
        }}
    >
        {props.children}
    </CountryContext.Provider>

}

export default CountryState;