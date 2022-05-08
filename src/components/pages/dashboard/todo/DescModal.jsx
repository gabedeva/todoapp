import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { Modal } from 'react-bootstrap';

const DescModal =  ({ isShow, closeModal, modalTitle, description }) => {

    useEffect(() => {

    }, [])

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

                                <p className="fs-14">{ description }</p>

                                <div className="form-group mrgt2">

                                    <Link onClick={closeModal} className="btn btn-primary btn-block fs-14 onwhite">Close</Link>

                                </div>

                            </div>

                        </div>

                    </div>

                </Modal.Body>

            </Modal>

        </>
    )


}

export default DescModal