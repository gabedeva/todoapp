import React, { useReducer } from 'react';
import Axios from 'axios';
import { useHistory } from "react-router";

import TodoReducer from './todoReducer';
import TodoContext from './todoContext';

import Body from "../../components/helpers/body";
import storage from '../../components/helpers/storage';

import {
    GET_USER_TODOS,
    GET_TODO,
    GET_REMINDER,
    GET_ITEM,
    SET_LOADING
} from '../types';

const TodoState = props => {

    const initialState = {
        todos: [],
        todo: {},
        reminder: {},
        item: {},
        loading: false
    }

    const history = useHistory();

    const logout = () => {
        localStorage.clear();
        Body.dismissBackground('dash-body');
        history.push('/login');
    }

    const [ state, dispatch ] = useReducer(TodoReducer, initialState);

    const getUserTodos = async (userId, limit) => {
        
        setLoading();

        await Axios.get(`${process.env.REACT_APP_TODO_URL}/todos/user/${userId}?${limit ? 'limit='+limit : ''}&sort=-desc`, storage.getConfigWithBearer())
        .then((resp) => {

            dispatch({
                type: GET_USER_TODOS,
                payload: resp.data.data
            })

        }).catch((err) => {
            console.log(`could not get user todos ${err}`);
        })
    }

    const getTodo = async (todoId) => {

        setLoading();

        await Axios.get(`${process.env.REACT_APP_TODO_URL}/todos/${todoId}`, storage.getConfigWithBearer())
        .then((resp) => {

            dispatch({
                type: GET_TODO,
                payload: resp.data.data
            })

        }).catch((err) => {
            console.log(`could not get todo ${err}`);
        })

    }

    const getReminder = async (id) => {

        setLoading();

        await Axios.get(`${process.env.REACT_APP_TODO_URL}/reminders/${id}`, storage.getConfigWithBearer())
        .then((resp) => {

            dispatch({
                type: GET_REMINDER,
                payload: resp.data.data
            })

        }).catch((err) => {

            if(err.response.data.status === 401){
                logout();
            }else{
                console.log(`Error: cannot get reminder ${err}`)
            }
        })
    }

    const getItem = async (id) => {
        setLoading();

        await Axios.get(`${process.env.REACT_APP_TODO_URL}/items/${id}`, storage.getConfigWithBearer())
        .then((resp) => {

            dispatch({
                type: GET_ITEM,
                payload: resp.data.data
            })

        }).catch((err) => {

            if(err.response.data.status === 401){
                logout();
            }else{
                console.log(`Error: cannot get item ${err}`)
            }

        })
    }

    const setLoading = () => { dispatch({ type: SET_LOADING })} 

    return <TodoContext.Provider
        value={{
            todos: state.todos,
            todo: state.todo,
            loading: state.loading,
            reminder: state.reminder,
            item: state.item,
            getUserTodos,
            getTodo,
            getReminder,
            getItem
        }}
    >

        { props.children }

    </TodoContext.Provider>
}

export default TodoState