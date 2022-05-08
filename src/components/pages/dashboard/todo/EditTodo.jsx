import React, { useState, useEffect, useContext} from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

import TopBar from '../../../layouts/partials/TopBar';
import RemModal from './RemModal';

import TodoContext from '../../../../context/todo/todoContext';
import Alert from "../../../layouts/partials/Alert";
import storage from '../../../helpers/storage'
import Axios from 'axios'

const EditTodo = (props) => {

    const todoContext = useContext(TodoContext);

    const history = useHistory();
    const params = useParams();
    const { id } = params;

    
    const [loading, setLoading] = useState(false);
    const [todoData, setTodoData] = useState({
        title: '',
        dueDate: '',
        dueTime: ''
    })

    const [alertData, setAlertData] = useState({
        show: false,
        type: '',
        message: ''
    })

    useEffect(() => {

        todoContext.getTodo(id);

    }, [])

    const goBack = (e) => {
        if(e) e.preventDefault();
        history.goBack();
    }

    const barLinks = () => {

        return(
            <>
                <div className="ui-group-button">

                    <Link onClick={(e) => goBack(e)} className="btn btn-sm btn-primary onwhite fs-15">Back</Link>

                </div>
            </>
        )

    }

    const save = async (e) => {

        if(e) e.preventDefault();

        const data = {

            title: todoData.title ? todoData.title : todoContext.todo.title,
            dueDate: todoData.dueDate ? todoData.dueDate : todoContext.todo.dueDate,
            dueTime: todoData.dueTime ? todoData.dueTime + ':00' : todoContext.todo.dueTime

        }

        if(!data.title && !data.dueDate && !data.dueTime){
            setAlertData({ ...alertData, type: 'danger', show: true, message: 'All fields are required'});
            setTimeout(() => {
              setAlertData({ ...alertData, show: false })  
            }, 5000);

        }else if(!data.title){
            setAlertData({ ...alertData, type: 'danger', show: true, message: 'Enter todo title'});
            setTimeout(() => {
              setAlertData({ ...alertData, show: false })  
            }, 5000);

        }else if(!data.dueDate){
            setAlertData({ ...alertData, type: 'danger', show: true, message: 'Choose due date'});
            setTimeout(() => {
              setAlertData({ ...alertData, show: false })  
            }, 5000);

        }else if(!data.dueTime){
            setAlertData({ ...alertData, type: 'danger', show: true, message: 'Choose due time'});
            setTimeout(() => {
              setAlertData({ ...alertData, show: false })  
            }, 5000);

        }else{

            setLoading(true);

            await Axios.put(`${process.env.REACT_APP_TODO_URL}/todos/${todoContext.todo._id}`, { ...data }, storage.getConfigWithBearer())
            .then((resp) => {

                if(resp.data.status === 200 && resp.data.error === false){         
                    history.push(`/dashboard/todo-list/${todoContext.todo._id}`);
                }else{
                    setLoading(false);
                    setAlertData({ ...alertData, type: 'danger', show: true, message: resp.data.errors[0] });
                    setTimeout(() => {
                      setAlertData({ ...alertData, show: false })  
                    }, 5000)
                }

            }).catch((err) => {
                setLoading(false);

                setAlertData({ ...alertData, type: 'danger', show: true, message: `${err.response.data.errors[0]}`});
                    setTimeout(() => {
                        setAlertData({ ...alertData, show: false })  
                      }, 5000);
            })
        }

    }

    return(
        <>
            <TopBar pageTitle="Edit Todo List" linkComps={barLinks} />

            <section>

                <div className="ui-dashboard-card ui-wrapper-small">

                    <div className="ui-card-body">

                        <div className="row">

                            <div className="col-md-6 mx-auto">

                                <div className="ui-form-box">

                                {
                                        todoContext.loading &&
                                        <>
                                            <div className="empty-state">
                                                <img src="../../../images/assets/spinner2.svg" alt="spinner-loading" width="35px" />
                                            </div>
                                        </>
                                }

                                {
                                    !todoContext.loading &&
                                    <>

                                        <Alert type={alertData.type} message={alertData.message} show={alertData.show} />

                                        <form onSubmit={(e) => e.preventDefault()}>

                                            <div className="form-group">
                                                <label htmlFor="title" className="fs-14">List title</label>
                                                <input
                                                defaultValue={todoContext.todo.title}
                                                onChange={(e) => setTodoData({ ...todoData, title: e.target.value })}
                                                type="text" className="form-control fs-15" placeholder="Enter a title" />
                                            </div>

                                            <div className="row">

                                                <div className="col-md-6">

                                                    <div className="form-group">
                                                        <label htmlFor="title" className="fs-14">Due date</label>
                                                        <input 
                                                        defaultValue={todoContext.todo.dueDate}
                                                        onChange={(e) => setTodoData({ ...todoData, dueDate: e.target.value })}
                                                        type="date" className="form-control fs-15" />
                                                    </div>

                                                </div>
                                                <div className="col-md-6">

                                                    <div className="form-group">
                                                        <label htmlFor="title" className="fs-14">Due time</label>
                                                        <input
                                                        defaultValue={todoContext.todo.dueTime} 
                                                        onChange={(e) => setTodoData({ ...todoData, dueTime: e.target.value })}
                                                        type="time" className="form-control fs-15" />
                                                    </div>

                                                </div>

                                            </div>

                                            <div className="ui-line bg-silverlight"></div>

                                            <div className="form-group mrgt1">


                                                {
                                                    loading &&
                                                    <Link className="btn btn-lg bg-apple onwhite disabled"> Saving... </Link>

                                                }

                                                {
                                                    !loading &&
                                                    <Link onClick={(e) => save(e)} className="btn btn-lg bg-apple onwhite"> Save Details </Link>

                                                }
                                                
                                            </div>

                                        </form>

                                    </>
                                }


                                </div>

                            </div>

                        </div>
                        
                    </div>

                </div>

            </section>

            
            
        </>
    )

}

export default EditTodo;