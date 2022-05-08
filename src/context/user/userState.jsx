import React, { useReducer } from 'react';
import Axios from 'axios';
import UserContext from './userContext';
import UserReducer from './userReducer';
import { useHistory } from "react-router";
import Body from "../../components/helpers/body";
import storage from '../../components/helpers/storage';

import {
     GET_LOGGEDIN_USER,
     SET_LOADING
 } from '../types';

 const UserState = props => {

    const initialState = {
        user: {},
        loading: false
    }
 
    const history = useHistory();

    const logout = () => {
        localStorage.clear();
        Body.dismissBackground('dash-body');
        history.push('/login');
    }


    const [state, dispatch] = useReducer(UserReducer, initialState);

    const getUser = async () => {

        setLoading();

        await Axios.get(`${process.env.REACT_APP_IDENTITY_URL}/auth/user`, storage.getConfigWithBearer())
        .then((resp) => {

            dispatch({
                type: GET_LOGGEDIN_USER,
                payload: resp.data.data
            })

        }).catch((err) => {
            if(err.response.data.status === 401 ){
                logout()
            }else{
                console.log(`Error: cannot get user ${err}`);
            }
        })
    }

    const setLoading = () => { dispatch({ type: SET_LOADING })} 

    return <UserContext.Provider
        value={{
            user: state.user,
            loading: state.loading,
            getUser
        }}
    >   
        { props.children }

    </UserContext.Provider>
 }

 export default UserState;