import { 
    GET_COUNTRY,
    GET_COUNTRIES,
    SET_LOADING,
    GET_IP_ADDRESS
} from '../types';

export default (state, action) => {
    switch(action.type){
        case GET_COUNTRIES: 
            return {
                ...state,
                countries: action.payload,
                loading: false
            }
        case GET_IP_ADDRESS: 
        return {
            ...state,
            ipData: action.payload,
            loading: false
        }
        case GET_COUNTRY:
            return {
                ...state,
                country: action.payload,
                loading: false
            }
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        default: 
        return state;
        
    }
}