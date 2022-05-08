import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Modal } from 'react-bootstrap'
import Axios from 'axios'

import storage from '../../../helpers/storage'
import Alert from '../../../layouts/partials/Alert'

import TodoContext from '../../../../context/todo/todoContext'

const RemModal = ({ isShow, closeModal, modalTitle, todoId, itemId }) => {

    const todoContext = useContext(TodoContext);

    const [remData, setRemData] = useState({

        dueDate: '',
        dueTime: '',
        isEnabled: false,
        todo: todoId,
        item: itemId

    });
    const [alertData, setAlertData] = useState({
        show: false,
        type: '',
        message: ''
    })
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        
    }, [])

    const handleCheck = (e) => {
        setRemData({ ...remData, isEnabled: e.target.checked })
    };

    const submit = async (e) => {

        if(e) e.preventDefault();

        if (!remData.dueDate && !remData.dueTime ) {
            setAlertData({ ...alertData, show: true, type: 'danger', message: 'All fields are required' })
            setTimeout(() => {
                setAlertData({ ...alertData, show: false })
            }, 5000);

        } else if (!remData.dueDate) {
            setAlertData({ ...alertData, show: true, type: 'danger', message: 'Choose a due date' })
            setTimeout(() => {
                setAlertData({ ...alertData, show: false })
            }, 5000);

        } else if (!remData.dueTime) {
            setAlertData({ ...alertData, show: true, type: 'danger', message: 'Choose a due time' })
            setTimeout(() => {
                setAlertData({ ...alertData, show: false })
            }, 5000);

        } else {

            const data = {

                dueDate: remData.dueDate,
                dueTime: remData.dueTime,
                isEnabled: remData.isEnabled,
                todo: todoId,
                item: itemId
            }

            setLoading(true);

            try {
                await Axios.post(`${process.env.REACT_APP_TODO_URL}/reminders`, { ...data }, storage.getConfigWithBearer())
                .then((resp) => {

                    if (resp.data.status === 200 && resp.data.error === false) {
                        todoContext.getTodo(todoId);
                        closeModal();
                        setLoading(false);
                    }

                }).catch((err) => {
                    setAlertData({ ...alertData, show: true, type: 'danger', message: `An error occured ${err}` })
                    setTimeout(() => {
                        setAlertData({ ...alertData, show: false })
                    }, 5000);
                    setLoading(false);
                })

            } catch (err) {
                setAlertData({ ...alertData, show: true, type: 'danger', message: `An error occured ${err}` })
                setTimeout(() => {
                    setAlertData({ ...alertData, show: false })
                }, 5000);
                setLoading(false);
            }
        }

    }

    return (
        <>

            <Modal
            show={isShow}
            onHide={closeModal}
            size='sm'
            fade={false}
            keyboard={false}
            centered
            className='custom-modal rem-modal'
            >

                <Modal.Body>

                    <div classname="modal-box">

                        <div className="modal-side-bar"></div>

                        <div className="modal-content-box">

                            <div className="modal-header-box">

                                <h2 className="mrgb0 onmineshaft font-weight-medium fs-18">{ modalTitle }</h2>

                                <Link onClick={closeModal} className="ml-auto" style={{position: 'relative', top: '3px'}}>
                                    <span className="fe fe-x fs-14"></span>
                                </Link>

                            </div>

                            <div className="modal-content-area">

                                <Alert show={alertData.show} type={alertData.type} message={alertData.message} />

                                <div className="">

                                    <form onSubmit={e => e.preventDefault()}>

                                        <div className="form-group">

                                            <label htmlFor="title" className="fs-14">Due date</label>
                                            <input 
                                            defaultValue={(e) => setRemData({ ...remData, dueDate: e.target.value })}
                                            onChange={(e) => setRemData({ ...remData, dueDate: e.target.value })}
                                            type="date" 
                                            className="form-control fs-15"
                                            />
                                            
                                        </div>
                                        
                                        <div className="form-group">

                                            <label htmlFor="title" className="fs-14">Due Time</label>
                                            <input 
                                            defaultValue={(e) => setRemData({ ...remData, dueTime: e.target.value + ':00' })}
                                            onChange={(e) => setRemData({ ...remData, dueTime: e.target.value + ':00' })}
                                            type="time" 
                                            className="form-control fs-15"
                                            />
                                            
                                        </div>

                                        <div className="form-group">

                                            <div className="custom-control custom-checkbox">

                                                <input onChange={(e) => handleCheck(e)} type="checkbox" className="custom-control-input" id="isEnabled" />
                                                <label htmlFor="isEnabled" className="custom-control-label">
                                                    <span>
                                                        Enable reminder
                                                    </span>
                                                </label>

                                            </div>

                                        </div>

                                        <div className="form-group">

                                            {
                                                loading ? (
                                                    <Link className="btn btn-primary btn-block fs-14 onwhite disabled"><img src="../../../images/assets/spinner-white.svg" alt="spinner" width='35px' /></Link>
                                                ) : (
                                                    <Link onClick={(e) => submit(e)} className="btn btn-primary btn-block fs-14 onwhite">Add Reminder</Link>
                                                )
                                            }

                                            

                                        </div>

                                    </form>

                                </div>

                            </div>

                        </div>

                    </div>

                </Modal.Body>

            </Modal>
            
        </>
    )
}

export default RemModal
