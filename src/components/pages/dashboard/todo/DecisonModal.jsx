import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import Axios from 'axios';
import storage from '../../../helpers/storage';

import TodoContext from '../../../../context/todo/todoContext';

const DecisionModal =  ({ isShow, closeModal, modalTitle, actionText, actionType, data, dataType, todo }) => {

    const todoContext = useContext(TodoContext)

    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(0);
    const [messageData, setMessage] = useState({
        type: '',
        message: '',
        title: ''
    })

    useEffect(() => {
        
    }, [])

    // mini component
    const Message = () => {
        return(
            <>

                <h3 className={`fs-15 font-weight-medium ${messageData.type === 'success' ? 'onapple' : 'onaliz'}`}>{ messageData.title }</h3>

                <p className="fs-14 onmineshaft mrgb0">{ messageData.message }</p>

                <div className="mrgt2">

                    <Link onClick={(e) => {close(e)}} className="btn bg-silver btn-block fs-14 onmineshaft">Ok</Link>

                </div>

            </>
        )
    }

    const submit = async (e) => {
        if(e) e.preventDefault();

        if (dataType === 'enable' && data !== null) {
            setLoading(true);
            enableReminder();
        }

        if(dataType === 'mark' && data !== null){
            setLoading(true);
            markItemCompleted();
        }

        if(dataType === 'delete' && data !== null){
            setLoading(true);
            deleteItem();
        }

        if(dataType === 'disable' && data !== null){
            setLoading(true);
            disableReminder();
        }
    };

    const enableReminder = async () => {

        await Axios.put(`${process.env.REACT_APP_TODO_URL}/reminders/${data._id}`, null, storage.getConfigWithBearer())
            .then((resp) => {
                if (resp.data.status === 200 && resp.data.error === false) {
                    setStep(1);
                    setMessage({ ...messageData, type: 'success', title: 'Success', message: 'Reminder enabled successfully' });
                    setLoading(false);

                    todoContext.getTodo(todo._id)
                } else {
                    setStep(1);
                    setMessage({ ...messageData, type: 'error', title: 'Error', message: `${resp.data.errors[0]}` });
                    setLoading(false)
                }
            }).catch((err) => {
                setStep(1);
                setMessage({ ...messageData, type: 'error', title: 'Error', message: `${err.response.data.errors[0]}` });
                setLoading(false);
            })

    }
    
    const markItemCompleted = async () => {

        await Axios.put(`${process.env.REACT_APP_TODO_URL}/items/${data._id}`, null, storage.getConfigWithBearer())
        .then((resp) => {

            if(resp.data.status === 200 && resp.data.error === false){
                setStep(1);
                setMessage({ ...messageData, type: 'success', title: 'successful', message: 'Reminder completed successfully' });
                setLoading(false);
                todoContext.getTodo(todo._id);

            }else{
                setStep(1);
                setMessage({ ...messageData, type: 'error', title: 'Error', message: `${resp.data.errors[0]}` });

            }

        }).catch((err) => {
            setStep(1);
            setMessage({ ...messageData, type: 'error', title: 'Error', message: `${err.response.data.errors[0]}` });
            setLoading(false);
        })
    }

    const deleteItem = async () => {

        await Axios.delete(`${process.env.REACT_APP_TODO_URL}/items/${data._id}`, storage.getConfigWithBearer())
        .then((resp) => {

            if(resp.data.status === 200 && resp.data.error === false){
                setStep(1);
                setMessage({ ...messageData, type: 'success', title: 'successful', message: 'Item deleted successfully' });
                setLoading(false);
                todoContext.getTodo(todo._id);

            }else{
                setStep(1);
                setMessage({ ...messageData, type: 'error', title: 'Error', message: `${resp.data.errors[0]}` });

            }

        }).catch((err) => {
            setStep(1);
            setMessage({ ...messageData, type: 'error', title: 'Error', message: `${err.response.data.errors[0]}` });
            setLoading(false);
        })
    }

    const disableReminder = async () => {

        await Axios.put(`${process.env.REACT_APP_TODO_URL}/reminders/disable/${data._id}`, null, storage.getConfigWithBearer())
            .then((resp) => {
                if (resp.data.status === 200 && resp.data.error === false) {
                    setStep(1);
                    setMessage({ ...messageData, type: 'success', title: 'Success', message: 'Reminder disabled successfully' });
                    setLoading(false);

                    todoContext.getTodo(todo._id)
                } else {
                    setStep(1);
                    setMessage({ ...messageData, type: 'error', title: 'Error', message: `${resp.data.errors[0]}` });
                    setLoading(false)
                }
            }).catch((err) => {
                setStep(1);
                setMessage({ ...messageData, type: 'error', title: 'Error', message: `${err.response.data.errors[0]}` });
                setLoading(false);
            })

    }

    const close = (e) => {
        if(e) e.preventDefault();

        setLoading(false);
        setStep(0);
        closeModal();
    }

    return(
        <>

            <Modal
                show={isShow}
                onHide={closeModal}
                size='sm'
                fade={false}
                keyboard={false}
                centered
                className="custom-modal rem-modal"
            >

                <Modal.Body>

                    <div className="modal-box">

                        <div className="modal-sidebar"></div>

                        <div className="modal-content-box">

                            <div className="modal-header-box">

                                <h2 className="mrgb0 onmineshaft font-weight-medium fs-18">{ modalTitle }</h2>

                                <Link onClick={closeModal} className="ml-auto" style={{ position: 'relative', top: '3px' }}><span className="fe fe-x fs-14"></span></Link>

                            </div>

                            <div className="modal-content-area">

                                {
                                    step === 0 &&
                                    <>
                                        <p className="fs-15 font-weight-bold ui-text-center mrgt1">
                                        Are you sure you want to { actionText }?
                                        </p>

                                        <div className="form-group mrgt2">

                                            <div className="row">

                                                <div className="col-md-6">
                                                    <Link onClick={closeModal} className={`btn bg-silver btn-block fs-14 onmineshaft ${loading ? 'disabled' : ''}`}>Cancel</Link>
                                                </div>

                                                <div className="col-md-6">
                                                    {
                                                        loading &&
                                                        <Link className={`btn btn-block fs-14 onwhite disabled ${actionType === 'success' ? 'bg-apple' : 'btn-danger'}`}>loading...</Link>
                                                    }
                                                    {
                                                        !loading &&
                                                        <Link onClick={(e) => {submit(e)}} className={`btn btn-block fs-14 onwhite ${actionType === 'success' ? 'bg-apple' : 'btn-danger'}`}>Yes</Link>
                                                    }
                                                </div>

                                            </div>

                                        </div>

                                    </>
                                }
                                {
                                    step === 1 &&
                                    <>
                                        <Message />
                                    </>
                                }
                               

                            </div>

                        </div>

                    </div>

                </Modal.Body>

            </Modal>

        </>
    )


}

export default DecisionModal