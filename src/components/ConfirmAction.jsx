import React from 'react';
import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter } from 'mdb-react-ui-kit';

const ConfirmAction = ({ openConfirm, setOpenConfirm, message, action }) => {
    return (
        <div>
            <MDBModal open={openConfirm} tabIndex="-1" staticBackdrop>
                <MDBModalDialog centered size="sm">
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Confirmar</MDBModalTitle>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <p className='text-center'>{message}</p>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn type="button" color="primary" onClick={action}>
                                Confirmar
                            </MDBBtn>
                            <MDBBtn type="button" color="danger" onClick={() => setOpenConfirm(false)}>
                                Cancelar
                            </MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </div>
    )
}

export default ConfirmAction