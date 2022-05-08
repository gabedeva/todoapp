import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

import UserContext from '../../../../context/user/userContext';
import TodoContext from '../../../../context/todo/todoContext';
import TopBar from '../../../layouts/partials/TopBar';

import DescModal from './DescModal';
import RemModal from './RemModal';
import DecisionModal from './DecisionModal';

import storage from '../../../helpers/storage'
import Axios from "axios";

const Details = (props) => {

    const params = useParams();
    const {  id } = params;

    const userContext = useContext(UserContext);
    const todoContext = useContext(TodoContext);
    const [empty, setEmpty] = useState(false);
    const [show, setShow] = useState(false)
    const [showRem, setShowRem] = useState(false);
    const [decide, setDecide] = useState({
        show: false,
        modalTitle: '',
        actionText: '',
        actionType: '',
        data: null,
        dataType: ''
    })

    const [ description, setDescription ] = useState('');
    const [itemId, setItemId ] = useState('');

    useEffect(() => {

        todoContext.getUserTodos(storage.getUserID(), 9999);
        configEmpty();

        todoContext.getTodo(id);
        
    }, [])

    const barLinks = () => {

        return(
            <>
                <div className="ui-group-button">

                    <Link className="btn btn-sm btn-primary onwhite fs-15">Back</Link>

                    <Link to="/dashboard/todo-lists/add-todo" className="btn btn-sm btn-primary onwhite fs-15">Add Todo List</Link>

                </div>
            </>
        )

    }

    const configEmpty = () => {

        setTimeout(() => {
            setEmpty(true)
        }, 3500)

    }

    const toggleShow = (e, d) => {

        if(e) e.preventDefault();

        setDescription(d);
        setShow(!show);

    }

    const toggleRem = (e, itemId) => {

        if(e) e.preventDefault();
        setItemId(itemId);
        setShowRem(!showRem);

    }

    const toggleDecision = (e, t, data) => {

        if(e) e.preventDefault();

        if(t === 'mark'){

            setDecide({ 

                ...decide,
                show: true,
                modalTitle: 'Mark completed',
                actionText: "mark item completed",
                actionType: 'success',
                data: data,
                dataType: t

            })

        }else if(t === 'delete'){

            setDecide({ 

                ...decide,
                show: true,
                modalTitle: 'Delete item',
                actionText: "delete item",
                actionType: 'delete',
                data: data,
                dataType: t

            })

        }else if(t === 'enable'){

            setDecide({ 

                ...decide,
                show: true,
                modalTitle: 'Enable Reminder',
                actionText: "enable reminder",
                actionType: 'success',
                data: data,
                dataType: t

            })

        }else if(t === 'disable'){

            setDecide({ 

                ...decide,
                show: true,
                modalTitle: 'Disable Reminder',
                actionText: "disable reminder",
                actionType: 'delete',
                data: data,
                dataType: t

            })

        }else if(t === 'del-todo'){

            setDecide({ 

                ...decide,
                show: true,
                modalTitle: 'Delete todo',
                actionText: "delete todo list",
                actionType: 'delete',
                data: data,
                dataType: t

            })

        }else{
            setDecide({ 

                ...decide,
                show: false,

            })
        }

    }   

    return(
        <>
            <TopBar pageTitle="Todo Details" linkComps={barLinks} />

            <section>

                <div className="ui-dashboard-card">

                    <div className="ui-card-header">

                        <h3 className="mrgb0 onmineshaft ui-card-title">Details</h3>

                        <div className="ui-card-header-options">

                            <div className="ui-group-button">

                                <Link to={`/dashboard/todo-list/edit/${todoContext.todo._id}`} className={`btn btn-sm onwhite btn-info ${todoContext.loading ? 'disabled' : ''}`}>Edit Todo</Link>
                                <Link onClick={(e) => toggleDecision(e, 'del-todo', todoContext.todo)} className={`btn btn-sm onwhite btn-danger ${todoContext.loading ? 'disabled' : ''}`}>Delete</Link>
                                
                            </div>

                        </div>
                        
                    </div>


                    <div className="ui-card-body">

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
                                
                            <div className="mrgt2 mrgb3">

                                    <h2 className="fs-18 font-weight-bold">{ todoContext.todo ? todoContext.todo.title : 'Todo Title' }</h2>
                                    <div>

                                        <span className="fs-16 font-weight-medium">Due Date: </span>
                                        <span className="fs-16 ">{ todoContext.todo ? todoContext.todo.dueDate : 'YYYY/MM/DD' } &nbsp; &nbsp; </span>

                                        <span className="fs-16 font-weight-medium">Due Time: </span>
                                        <span className="fs-16 ">{ todoContext.todo ? todoContext.todo.dueTime : 'HH:MM:SS' }</span>

                                    </div>

                                </div>

                            {
                                todoContext.todo.items && todoContext.todo.items.length > 0 &&
                                <>
                                        
                                        <table className="table custom-table">

                                            <thead>

                                                <tr>
                                                    <th>Description</th>
                                                    <th>Status</th>
                                                    <th>Due Date</th>
                                                    <th>Due Time</th>
                                                    <th>Reminder</th>
                                                    <th>Action</th>
                                                </tr>

                                            </thead>

                                            <tbody>

                                                {
                                                    !todoContext.loading && todoContext.todo.items && todoContext.todo.items.length > 0 &&
                                                    todoContext.todo.items.map((item, index) =>

                                                        <>
                                                        
                                                            <tr>

                                                                <td className="fs-14"><Link onClick={(e) => toggleShow(e, item.description)} className="onblue">{ item.description }</Link></td>
                                                                <td className="fs-14">{ item.status }</td>
                                                                <td className="fs-14">{ item.dueDate }</td>
                                                                <td className="fs-14">{ item.dueTime }</td>
                                                                <td className="fs-14">
                                                                    
                                                                    { 
                                                                    
                                                                        item.reminder ? 
                                                                        (
                                                                            <>
                                                                                {
                                                                                    item.reminder.isEnabled &&
                                                                                    <>
                                                                                        <span className="fs-14 onapple">Enabled</span> &nbsp;
                                                                                        <Link onClick={(e) => toggleDecision(e, 'disable', item.reminder)} className="onaliz">[x]</Link>

                                                                                    </>
                                                                                }

                                                                                {
                                                                                    !item.reminder.isEnabled &&
                                                                                    <Link onClick={(e) => toggleDecision(e, 'enable', item.reminder)} className="onblue">Enable Reminder</Link>
                                                                                }

                                                                            </>
                                                                        ) : 

                                                                        (
                                                                            <Link onClick={(e) => toggleRem(e, item._id)} className="onflamingo">Add Reminder</Link>

                                                                        )
                                                                    
                                                                    }
                                                                
                                                                </td>

                                                                <td>
                                                                    <div className="ui-group-button">

                                                                        {
                                                                            item.status !== 'completed' &&
                                                                            <Link to={`/dashboard/todo-list/edit-item/${item._id}`} className="onblue"><span className="fe fe-edit fs-16"></span></Link>
                                                                        }

                                                                        <Link onClick={(e) => toggleDecision(e, 'delete', item)} className="onaliz"><span className="fe fe-trash fs-16"></span></Link>
                                                                    
                                                                        {
                                                                            item.status !== 'completed' &&
                                                                            <Link onClick={(e) => toggleDecision(e, 'mark', item)} className="onapple"><span className="fe fe-check-square fs-16"></span></Link>
                                                                        }

                                                                    </div>
                                                                </td>

                                                            </tr>
                                                        
                                                        </>
                                                    )
                                                }

                                                {/* <tr>
                                                    <td className="fs-14"><Link onClick={(e) => toggleShow(e)} className="onblue">Meet Uriel for BTF meeting @3PM on Thursday</Link></td>
                                                    <td className="fs-14">18/08/21</td>
                                                    <td className="fs-14">03:56:00 PM</td>
                                                    <td className="fs-14">
                                                        <span className="fs-14 onapple">Enabled</span>
                                                    </td>
                                                    <td>
                                                        <div className="ui-group-button">

                                                            <Link to='/dashboard/todo-list/edit-item/076543467898765678' className="onblue"><span className="fe fe-edit fs-16"></span></Link>
                                                            <Link onClick={(e) => toggleDecision(e, 'delete', null)} className="onaliz"><span className="fe fe-trash fs-16"></span></Link>
                                                            <Link onClick={(e) => toggleDecision(e, 'mark', null)} className="onapple"><span className="fe fe-check-square fs-16"></span></Link>

                                                        </div>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td className="fs-14"><Link onClick={(e) => toggleShow(e)} className="onblue">Meet Uriel for BTF meeting @3PM on Thursday</Link></td>
                                                    <td className="fs-14">8</td>
                                                    <td className="fs-14">18/08/21</td>
                                                    <td className="fs-14">03:56:00 PM</td>
                                                    <td className="fs-14">
                                                        <Link onClick={(e) => toggleRem(e)} className="onflamingo">Add Reminder</Link>
                                                    </td>
                                                    <td>
                                                        <div className="ui-group-button">

                                                            <Link to='/dashboard/todo-list/edit/09876567899876567' className="onblue"><span className="fe fe-edit fs-16"></span></Link>
                                                            <Link onClick={(e) => toggleDecision(e, 'delete', null)} className="onaliz"><span className="fe fe-trash fs-16"></span></Link>
                                                            <a style={{opacity: '0.5'}}><span className="fe fe-check-square fs-16 text-muted"></span></a>

                                                        </div>
                                                    </td>
                                                </tr> */}

                                            </tbody>

                                        </table>


                                </>
                            }

                            {
                                todoContext.todo.items && todoContext.todo.items.length <= 0 &&
                                <>
                                
                                    <div className="empty-state">

                                        <p className="mrgb1 fs-14">This todo does not have items. Click the button below to add an item</p>
                                        <Link to={`/dashboard/todo-list/add-item/${todoContext.todo._id}`} className="btn btn-primary onwhite fs-14">Add Item</Link>

                                    </div>
                                
                                </>
                            }



                            </>
                        }
      
                </div>

            </div>

            </section>

            <DescModal isShow={show} closeModal={toggleShow} modalTitle="Item Description" description={description} />
            <RemModal isShow={showRem} closeModal={toggleRem} modalTitle="Add Reminder" todoId= {id} itemId={itemId} />
            <DecisionModal 
            isShow={decide.show} 
            closeModal={toggleDecision} 
            modalTitle={decide.modalTitle} 
            actionType={decide.actionType}
            actionText={decide.actionText}
            data={decide.data}
            dataType={decide.dataType}
            todo={todoContext.todo}
            />
        </>
    )

}

export default Details;