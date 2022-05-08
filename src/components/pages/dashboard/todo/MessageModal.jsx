import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { Modal } from 'react-bootstrap';

const MessageModal =  ({ isShow, closeModal, type, errorMessage }) => {

    const history = useHistory();

    useEffect(() => {

    }, [])

    const goTo = (e, url) => {
        if(e) e.preventDefault();
        
        closeModal();
        if(url){
            history.push(url);
        }
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

                         

                            <div className="modal-content-area">

                                <p className="fs-15 font-weight-bold ui-text-center mrgt1">
                                    { 
                                        type === 'success' &&
                                        <>
                                            <span className="fs-14 omineshaft">Todo list has been created successfully</span>
                                        </>
                                    }
                                    {
                                        type === 'error' &&
                                        <>
                                            <span className="fs-14 omineshaft">{errorMessage}</span>

                                        </>
                                    }
                                </p>

                                <div className="form-group mrgt2">

                                    <div className="row">

                                        <div className="col-md-12">
                                            <Link onClick={(e) => goTo(e, `${type === 'success' ? '/dashboard/todo-list' : ''}`)} className={`btn btn-block fs-14 onwhite btn-primary`}>Close</Link>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </Modal.Body>

            </Modal>

        </>
    )


}

export default MessageModal