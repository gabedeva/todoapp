import {
    GET_USER_TODOS,
    GET_TODO,
    GET_REMINDER,
    GET_ITEM,
    SET_LOADING
} from '../types';

export default (state, action) => {

    switch(action.type){

        case GET_USER_TODOS:
            return{
                ...state,
                todos: action.payload,
                loading: false
            }

        case GET_TODO:
            return{
                ...state,
                todo: action.payload,
                loading: false
            }

        case GET_REMINDER:
            return{
                ...state,
                reminder: action.payload,
                loading: false
            }

        case GET_ITEM:
            return{
                ...state,
                item: action.payload,
                loading: false
            }

        case SET_LOADING:
            return{
                ...state,
                loading: true
            }

            default:
                return state;
    }

}