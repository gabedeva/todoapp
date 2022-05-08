import React, { useState, useEffect, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'


import TopBar from '../../../layouts/partials/TopBar'
import RemModal from "./RemModal";
import Alert from "../../../layouts/partials/Alert";
import Axios from "axios";
import storage from "../../../helpers/storage";
import MessageModal from "./MessageModal";

const AddTodo = () => {

    const [showAdd, setShowAdd] = useState(false);
    const [showRem, setshowRem] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [errorMsg, setErrorMsg] = useState({
        type: '',
        message: ''
    })
    const [duplicate, setDuplicate] = useState([]);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);

    const [todoData, setTodoData] = useState({
        title: '',
        dueDate: '',
        duetime: ''
    });


    const [itemsArray, setItems] = useState([])

    const [reminder, setReminder] = useState({
        dueDate: '',
        dueTime: ''
    })

    const [alertData, setAlertData] = useState({
        show: false,
        type: '',
        message: ''
    })


    useEffect(() => {
        
    }, [])

    const history = useHistory();

    const goBack = (e) => {

        if (e) e.preventDefault();
        history.goBack();

    }

    const barLinks = () => {
        return(
            <>
                <div className="ui-group-button">
                    <Link
                    onClick={e => goBack()} 
                    className="btn btn-sm btn-primary onwhite fs-15">
                        Back
                    </Link>
                </div>
            </>
        )
    }

    const toggleMessage = (e) => {
        if(e) e.preventDefault();
        setShowMessage(!showMessage);
    }

    const toggleAdd = (e) => {
        if (e) e.preventDefault();
        
        setShowAdd(true);
        setDuplicate(duplicate.concat([count + 1]));
        setCount(count + 1);
    }
    
    const toggleRem = (e, index) => {
        if (e) e.preventDefault();
        
        const currItems = duplicate;
        currItems.splice(index, 1);
        setDuplicate(currItems);
        setCount(count - 1);

        if (currItems.length === 0) {
            setShowAdd(false);
            setCount(0);
            setDuplicate([]);
        }
    }

    const showRemModal = (e) => {
        if(e) e.preventDefault();
        setshowRem(!showRem);
    }
    
    const duplicateItem = (e) => {
        if (e) e.preventDefault();

        setDuplicate(duplicate.concat([count + 1]));
        setCount(count + 1);
    }

    const submit = async (e) => {
        if(e) e.preventDefault();

        if(!todoData.title && !todoData.dueDate && !todoData.duetime){
            setAlertData({ ...alertData, show:true, type: 'danger', message: 'All fields are required'});
            setTimeout(() => {
                setAlertData({ ...alertData, show: false })
            }, 5000);
        }else if(!todoData.title){
            setAlertData({ ...alertData, show:true, type: 'danger', message: 'Enter a title for todo list'});
            setTimeout(() => {
                setAlertData({ ...alertData, show: false })
            }, 5000);
        }else if(!todoData.dueDate){
            setAlertData({ ...alertData, show:true, type: 'danger', message: 'Choose a due date for todo list'});
            setTimeout(() => {
                setAlertData({ ...alertData, show: false })
            }, 5000);
        }else if(!todoData.dueTime){
            setAlertData({ ...alertData, show:true, type: 'danger', message: 'Choose a due time for todo list'});
            setTimeout(() => {
                setAlertData({ ...alertData, show: false })
            }, 5000);
        }else{
            if(duplicate.length <= 0 ){
                setAlertData({ ...alertData, show:true, type: 'danger', message: 'You must have at least an item for this todo list'});
                setTimeout(() => {
                    setAlertData({ ...alertData, show: false })
                }, 5000);
            }else{

                // save the items
               const items = await pushItems();

                if(items.length > 0 && items.length === duplicate.length){

                    setLoading(true);

                    await Axios.post(`${process.env.REACT_APP_TODO_URL}/todos?user_id=${storage.getUserID()}`, { ...todoData }, storage.getConfigWithBearer())
                    .then(async (resp) => {

                        if(resp.data.status === 200 && resp.data.error === false){

                            const create = await createItems(items, resp.data.data._id);

                            if(create === false){
                                setErrorMsg({ ...errorMsg, message: 'An error occured. Please try again', type: 'error' });
                                toggleMessage();
                            }else{
                                setErrorMsg({ ...errorMsg, type: 'success' });
                                toggleMessage();
                            }
                        }

                    })
                }

            }
        }
    }

    const pushItems = () => {

        let dataQ = [];

        for(let i = 0; i < duplicate.length; i++){

            const tItem = document.getElementById(`item-title-${i}`).value;
            const tDesc = document.getElementById(`item-desc-${i}`).value;
            const tDate = document.getElementById(`item-date-${i}`).value;
            const tTime = document.getElementById(`item-time-${i}`).value;

            const data =  {
                    title: tItem,
                    description: tDesc,
                    dueDate: tDate,
                    dueTime: tTime + ':00'
                }

            const check = checkItems(data, i);

            if(check){

                dataQ.push(data);

            }else{

                dataQ = [];
            }

        }

        return dataQ
    }

    const checkItems = (data, index) => {
        let flag = false;

        if(!data.title && !data.description && !data.dueDate && !data.dueTime){
            const alertBox = document.getElementById(`item-alert-${index}`);
            alertBox.innerHTML = 'All Item fields are required';
            flag = false;

        }else if(!data.title){
            const alertBox = document.getElementById(`item-alert-${index}`);
            alertBox.innerHTML = 'Enter item title';
            flag = false;

        }else if(!data.description){
            const alertBox = document.getElementById(`item-alert-${index}`);
            alertBox.innerHTML = 'Enter item description';
            flag = false;

        }else if(!data.dueDate){
            const alertBox = document.getElementById(`item-alert-${index}`);
            alertBox.innerHTML = 'Enter item due date';
            flag = false;

        }else if(!data.dueTime){
            const alertBox = document.getElementById(`item-alert-${index}`);
            alertBox.innerHTML = 'Enter item due time';
            flag = false;

        }else{
            flag = true;
        }

        return flag;
    }
    
    const createItems = async (data, todoId) => {

        let flag = false;

        for(let j = 0; j < data.length; j++){

            const item = {
                title: data[j].title,
                description: data[j].description,
                dueDate: data[j].dueDate,
                dueTime: data[j].dueTime,
                todo: todoId
            }

            const result = await Axios.post(`${process.env.REACT_APP_TODO_URL}/items?user_id=${storage.getUserID()}`, {...item}, storage.getConfigWithBearer())

            if(result.data.status === 200 && result.data.error === false){

                flag = true;
                continue;

            }else{

                flag = false;

            }
        }

        return flag;
    }

    return (
        <>

            <TopBar pageTitle='Add Todos' linkComps={barLinks} />

            <section>

                <div className="ui-dashboard-card ui-wrapper-small">

                    <div className="ui-card-body">

                        <div className="row">

                            <div className="col-md-6 mx-auto">

                                <div className="ui-form-box">
                                    
                                    <Alert show={alertData.show} type={alertData.type} message={alertData.message} />

                                    <form onSubmit={e => e.preventDefault()}>

                                        <div className="form-group">
                                            <label htmlFor="title" className="fs-14">List Title</label>
                                            <input 
                                            defaultValue={(e) => setTodoData({ ...todoData, title: e.target.value})}
                                            onChange={(e) => setTodoData({ ...todoData, title: e.target.value})}
                                            type="text" 
                                            className="form-control fs-15"
                                            placeholder="Enter a title"
                                            />
                                        </div>

                                        <div className="row">

                                            <div className="col-md-6">

                                                <div className="form-group">
                                                    <label htmlFor="title" className="fs-14">Due Date</label>
                                                    <input 
                                                    defaultValue={(e) => setTodoData({ ...todoData, dueDate: e.target.value})}
                                                    onChange={(e) => setTodoData({ ...todoData, dueDate: e.target.value})}
                                                    type="date" 
                                                    className="form-control fs-15"
                                                    />
                                                </div>

                                            </div>

                                            <div className="col-md-6">

                                                <div className="form-group">
                                                    <label htmlFor="title" className="fs-14">Due Time</label>
                                                    <input 
                                                    defaultValue={(e) => setTodoData({ ...todoData, dueTime: e.target.value + ':00'})}
                                                    onChange={(e) => setTodoData({ ...todoData, dueTime: e.target.value + ':00'})}
                                                    type="time" 
                                                    className="form-control fs-15"
                                                    placeholder="Enter a title"
                                                    />
                                                </div>

                                            </div>

                                        </div>

                                        <div className="ui-line bg-silverlight"></div>


                                        <div className="d-flex align-item-center">
                                            <h3 className="fs-14">Todo Items ({count})</h3>
                                            {
                                                !showAdd &&
                                                <Link onClick={e => {toggleAdd(e)}} className="ml-auto onblue fs-15">Add Item</Link>
                                            }
                                        </div>

                                        {
                                            showAdd &&
                                            <>
                                                <div className="todo-items">

                                                    {
                                                        duplicate.map((item, i) => 

                                                            <>

                                                                <div className="td-item">

                                                                    <div id={`item-alert-${i}`} className="onaliz"></div>

                                                                    <div className="row">

                                                                        <div className="col-md-6">

                                                                            <div className="form-group">
                                                                            <label htmlFor="title" className="fs-14">Item title</label>
                                                                                <input
                                                                                id={`item-title-${i}`}  
                                                                                type="text" 
                                                                                className="form-control fs-15"
                                                                                placeholder="Enter a title"
                                                                                />
                                                                            </div>

                                                                        </div>
                                                                        
                                                                        <div className="col-md-6">

                                                                            <div className="form-group">
                                                                                <label htmlFor="title" className="fs-14">Item description</label>
                                                                                <input 
                                                                                id={`item-desc-${i}`}
                                                                                type="text" 
                                                                                className="form-control fs-15"
                                                                                placeholder="Enter a description"
                                                                                />
                                                                            </div>

                                                                        </div>

                                                                    </div>

                                                                    <div className="row">

                                                                        <div className="col-md-6">

                                                                            <div className="form-group">
                                                                                <label htmlFor="title" className="fs-14">Item due date</label>
                                                                                <input 
                                                                                id={`item-date-${i}`}
                                                                                type="date" 
                                                                                className="form-control fs-15"
                                                                                />
                                                                            </div>

                                                                        </div>

                                                                        <div className="col-md-6">

                                                                            <div className="form-group">
                                                                                <label htmlFor="title" className="fs-14">Item due time</label>
                                                                                <input 
                                                                                id={`item-time-${i}`}
                                                                                type="time" 
                                                                                className="form-control fs-15"
                                                                                placeholder="Enter a title"
                                                                                />
                                                                            </div>

                                                                        </div>

                                                                    </div>

                                                                    <div className="d-flex align-item-center">
                                                                        <Link onClick={e => toggleRem(e,i)} className="onaliz fs-13">Remove</Link>&nbsp;&nbsp;
                                                                        <Link onClick={e => showRemModal(e)} className="onapple fs-13">Add Reminder</Link>
                                                                    </div>

                                                                </div>
                                                            
                                                            </>
                                                        )
                                                    }


                                                    <div className="d-flex align-item-center">

                                                        <div className="ml-auto">
                                                            
                                                            <Link onClick={e => duplicateItem(e)} className="onblue fs-15">Add Item</Link>
                                                            
                                                        </div>

                                                    </div>

                                                </div>
                                            </>
                                        }

                                        <div className="form-group mrgt3">
                                            <Link onClick={(e) => submit(e)} className="btn btn-primary btn-lg onwhite mrgb3">Save Details</Link>
                                        </div>

                                    </form>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            <RemModal isShow={showRem} closeModal={showRemModal} modalTitle="Add Reminder" />

            <MessageModal isShow={showMessage} closeModal={toggleMessage} errorMessage={errorMsg.message} type={errorMsg.type} />
        </>
    )
}

export default AddTodo
