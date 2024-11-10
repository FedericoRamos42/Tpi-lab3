import React, { useState } from 'react';
import { MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBInput, MDBRow, MDBCol, MDBBtn } from 'mdb-react-ui-kit';
import ErrorForm from '../Error/ErrorForm';

const FormAddAppointment = ({ user, open, setOpen }) => {
    const [error, setError] = useState(false);
    const [formData, setFormData] = useState({
        date: '',
        time: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError(false);

            const dataToSend = {
                date: formData.date,
                time: formData.time,
                doctorId: user.id,
                patientId: null   
            };

            const response = await fetch(`http://localhost:5190/api/Appointment/CreateAppointment`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${user?.token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSend)
            });

            if (!response.ok) {
                throw new Error("Error al crear el turno");
            }
            
            setOpen(false);

        } catch (error) {
            console.error("Error:", error);
            setError(true);
        }
    };

    return (
        <MDBModal open={open} tabIndex="-1" staticBackdrop>
            <MDBModalDialog centered size="lg">
                <MDBModalContent>
                    <form onSubmit={handleSubmit}>

                        {error && (
                            <ErrorForm />
                        )}

                        <MDBModalHeader>
                            <MDBModalTitle>Crear Turno</MDBModalTitle>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <MDBRow className="g-3">
                                <MDBCol md="6">
                                    <MDBInput
                                        label="Fecha"
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        required
                                    />
                                </MDBCol>
                                <MDBCol md="6">
                                    <MDBInput
                                        label="Hora"
                                        type="time"
                                        name="time"
                                        value={formData.time}
                                        onChange={handleChange}
                                        required
                                    />
                                </MDBCol>
                            </MDBRow>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn type="submit" color="primary">
                                Crear Turno
                            </MDBBtn>
                            <MDBBtn type="button" color="danger" onClick={() => setOpen(false)}>
                                Cancelar
                            </MDBBtn>
                        </MDBModalFooter>
                    </form>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
};

export default FormAddAppointment;
