import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Modal} from 'react-bootstrap';

const UpdateModal = ({isShow, closeModal}) => {

    return(
        <>
            <Modal show={isShow} 
            onHide={() => {}} 
            fade={false}
            keyboard={false}
            arial-labelBy={'_modal'}
            centered
            className="md-modal">
                    <Modal.Body>
                        Hi, Welocme.
                    </Modal.Body>
            </Modal>
        </>
    )

}

export default UpdateModal;