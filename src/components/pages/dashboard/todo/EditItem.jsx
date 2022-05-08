import React, { useState, useEffect, useContext} from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

import TopBar from '../../../layouts/partials/TopBar';
import RemModal from './RemModal';

import TodoContext from "../../../../context/todo/todoContext";
import Alert from "../../../layouts/partials/Alert";
import Axios from "axios";
import storage from '../../../helpers/storage';

const EditItem = (props) => {

    const todoContext = useContext(TodoContext);

    
    const history = useHistory();
    const params = useParams();
    const { id } = params;

    const [loading, setLoading] = useState(false);
    const [itemData, setItemData] = useState({
        title: '',
        description: '',
        dueDate: '',
        dueTime: ''
    })

    const [alertData, setAlertData] = useState({
        show: false,
        type: '',
        message: ''
    })

    useEffect(() => {
        todoContext.getItem(id);
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

    const submit = async (e) => {

        if(e) e.preventDefault();

        const data = {

            title: itemData.title ? itemData.title : todoContext.item.title,
            description: itemData.description ? itemData.description : todoContext.item.description,
            dueDate: itemData.dueDate ? itemData.dueDate : todoContext.item.dueDate,
            dueTime: itemData.dueTime ? itemData.dueTime + ':00' : todoContext.item.dueTime

        }

        if(!data.title && !data.description && !data.dueDate && !data.dueTime){
            setAlertData({ ...alertData, type: 'danger', show: true, message: 'All fields are required'});
            setTimeout(() => {
              setAlertData({ ...alertData, show: false })  
            }, 5000);
        }else if(!data.title){
            setAlertData({ ...alertData, type: 'danger', show: true, message: 'Enter item title'});
            setTimeout(() => {
              setAlertData({ ...alertData, show: false })  
            }, 5000);
        }else if(!data.description){
            setAlertData({ ...alertData, type: 'danger', show: true, message: 'Enter item description'});
            setTimeout(() => {
              setAlertData({ ...alertData, show: false })  
            }, 5000)
        }else if(!data.dueDate){
            setAlertData({ ...alertData, type: 'danger', show: true, message: 'Choose a due date'});
            setTimeout(() => {
              setAlertData({ ...alertData, show: false })  
            }, 5000)
        }else if(!data.dueTime){
            setAlertData({ ...alertData, type: 'danger', show: true, message: 'Choose a due time'});
            setTimeout(() => {
              setAlertData({ ...alertData, show: false })  
            }, 5000)
        }else{
            setLoading(true);

            await Axios.get(`${process.env.REACT_APP_TODO_URL}/items/${todoContext.item._id}`, { ...data }, storage.getConfigWithBearer())
            .then((resp) => {

                if(resp.data.status === 200 && resp.data.error === false){

                    setAlertData({ ...alertData, type: 'success', show: true, message: 'Item saved successfully'});
                    setTimeout(() => {
                        setAlertData({ ...alertData, show: false })  
                      }, 5000);
                    setLoading(false);
                    todoContext.getItem(id);

                }else{
                    
                    setAlertData({ ...alertData, type: 'danger', show: true, message: resp.data.errors[0]});
                    setTimeout(() => {
                        setAlertData({ ...alertData, show: false })  
                      }, 5000);
                    setLoading(false);
                }

            }).catch((err) => {
                
                setAlertData({ ...alertData, type: 'danger', show: true, message: `${err.response.data.errors[0]}`});
                setTimeout(() => {
                    setAlertData({ ...alertData, show: false })  
                  }, 5000);
            })

        }
    }

    return(
        <>

            <TopBar pageTitle="Edit Todo Item" linkComps={barLinks} />

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
                                             
                                        <form onSubmit={(e) => e.preventDefault()}>
 
                                      <>
                                        
                                        <div className="todo-items">

                
                                        <>
                                <div className="td-item">

                            <div className="row">

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="title" className="fs-14">Item title</label>
                                            <input
                                            defaultValue={todoContext.item ? todoContext.item.title : ''}
                                            onChange={(e) => setItemData({ ...itemData, title: e.target.value })} 
                                            type="text" className="form-control fs-15" placeholder="Enter a title" />
                                        </div>
                                    </div>

                                    <div className="col-md-6">

                                        <div className="form-group">
                                            <label htmlFor="title" className="fs-14">Item description</label>
                                            <input 
                                            defaultValue={todoContext.item ? todoContext.item.description : ''}
                                            onChange={(e) => setItemData({ ...itemData, title: e.target.value })} 
                                            type="text" className="form-control fs-15" placeholder="Enter a description" />
                                        </div>
                                        
                                    </div>

                                </div>

                                <div className="row">

                                    <div className="col-md-6">

                                        <div className="form-group">
                                            <label htmlFor="title" className="fs-14">Item due date</label>
                                            <input 
                                            defaultValue={todoContext.item ? todoContext.item.dueDate : ''}
                                            onChange={(e) => setItemData({ ...itemData, title: e.target.value })} 
                                            type="date" className="form-control fs-15" />
                                        </div>

                                    </div>
                                    <div className="col-md-6">

                                        <div className="form-group">
                                            <label htmlFor="title" className="fs-14">Item due time</label>
                                            <input 
                                            defaultValue={todoContext.item ? todoContext.item.dueTime : ''}
                                            onChange={(e) => setItemData({ ...itemData, title: e.target.value })} 
                                            type="time" className="form-control fs-15" />
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </>
            </div>
                                    
                </>


                    <div className="form-group mrgt3">

                            {
                                loading &&
                                <Link className="btn btn-lg bg-apple onwhite disabled"> Saving... </Link>
                            }

                            {
                                !loading &&
                                <Link onClick={(e) => submit(e)} className="btn btn-lg bg-apple onwhite"> Save details </Link>
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

export default EditItem;