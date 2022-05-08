import React, { useState, useEffect, useContext} from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

import TopBar from '../../../layouts/partials/TopBar';
import RemModal from './RemModal';

import TodoContext from "../../../../context/todo/todoContext";
import Alert from "../../../layouts/partials/Alert";
import Axios from "axios";
import storage from '../../../helpers/storage';

const AddItem = (props) => {

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

        if(!itemData.title && !itemData.description && !itemData.dueDate && !itemData.dueTime){
            setAlertData({ ...alertData, show:true, type: 'danger', message: 'All fields are required'});
            setTimeout(() => {
                setAlertData({ ...alertData, show: false })
            }, 5000);

        }else if(!itemData.title){
            setAlertData({ ...alertData, show:true, type: 'danger', message: 'Item title is required'});
            setTimeout(() => {
                setAlertData({ ...alertData, show: false })
            }, 5000);

        }else if(!itemData.description){
            setAlertData({ ...alertData, show:true, type: 'danger', message: 'Item description is required'});
            setTimeout(() => {
                setAlertData({ ...alertData, show: false })
            }, 5000);

        }else if(!itemData.dueDate){
            setAlertData({ ...alertData, show:true, type: 'danger', message: 'Item dueDate is required'});
            setTimeout(() => {
                setAlertData({ ...alertData, show: false })
            }, 5000);

        }else if(!itemData.dueTime){
            setAlertData({ ...alertData, show:true, type: 'danger', message: 'Item dueTime is required'});
            setTimeout(() => {
                setAlertData({ ...alertData, show: false })
            }, 5000);

        }else{

            setLoading(true);

            const item = {
                title: itemData.title,
                description: itemData.description,
                dueDate: itemData.dueDate,
                dueTime: itemData.dueTime + ':00',
                todo: id
            }

            await Axios.post(`${process.env.REACT_APP_TODO_URL}/items?user_id=${storage.getUserID()}`, { ...item }, storage.getConfigWithBearer())
            .then((resp) => {
                if(resp.data.status === 200 && resp.data.error === false){
                 
                    setLoading(false);
                    history.push(`/dashboard/todo-list/${id}`);
    
                }else{
                   
                    setLoading(false);
                    setAlertData({ ...alertData, show:true, type: 'danger', message: `${resp.data.errors[0]}` })
                    setTimeout(() => {
                        setAlertData({ ...alertData, show: false })
                    }, 5000);        
    
                }
            }).catch((err) => {

                setLoading(false);
                setAlertData({ ...alertData, show:true, type: 'danger', message: err.response.data.errors[0] })
                setTimeout(() => {
                    setAlertData({ ...alertData, show: false })
                }, 5000);        

            })
        }

    }

    return(
        <>

            <TopBar pageTitle="Add Item" linkComps={barLinks} />

            <section>

                <div className="ui-dashboard-card ui-wrapper-small">

                    <div className="ui-card-body">

                        <div className="row">

                            <div className="col-md-6 mx-auto">

                                <div className="ui-form-box">

                                    <Alert show={alertData.show} message={alertData.message} type={alertData.type} />

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
                                                defaultValue={(e) => setItemData({ ...itemData, title: e.target.value})}
                                                onChange={(e) => setItemData({ ...itemData, title: e.target.value })} 
                                                type="text" className="form-control fs-15" placeholder="Enter a title" />
                                            </div>
                                            </div>

                                            <div className="col-md-6">

                                            <div className="form-group">
                                                <label htmlFor="title" className="fs-14">Item description</label>
                                                <input 
                                                defaultValue={(e) => setItemData({ ...itemData, description: e.target.value})}
                                                onChange={(e) => setItemData({ ...itemData, description: e.target.value })} 
                                                type="text" className="form-control fs-15" placeholder="Enter a description" />
                                            </div>
                                            
                                            </div>

                                    </div>

                                    <div className="row">

                                    <div className="col-md-6">

                                    <div className="form-group">
                                        <label htmlFor="title" className="fs-14">Item due date</label>
                                        <input 
                                                defaultValue={(e) => setItemData({ ...itemData, dueDate: e.target.value})}
                                                onChange={(e) => setItemData({ ...itemData, dueDate: e.target.value })} 
                                        type="date" className="form-control fs-15" />
                                    </div>

                                    </div>
                                        <div className="col-md-6">

                                            <div className="form-group">
                                                <label htmlFor="title" className="fs-14">Item due time</label>
                                                <input 
                                                        defaultValue={(e) => setItemData({ ...itemData, dueTime: e.target.value + ':00'})}
                                                        onChange={(e) => setItemData({ ...itemData, dueTime: e.target.value })} 
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
                                                <Link onClick={(e) => submit(e)} className="btn btn-lg bg-apple onwhite"> Add Item </Link>
                                                }

                                        </div>

                                </form>


                                </div>

                            </div>

                        </div>
                        
                    </div>

                </div>

            </section>
            
        </>
    )

}

export default AddItem;