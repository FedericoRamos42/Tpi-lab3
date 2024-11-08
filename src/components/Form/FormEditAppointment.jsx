import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBInput, MDBRow, MDBCol, MDBBtn } from 'mdb-react-ui-kit';

const FormAddAppointment = ({ user, open, setOpen }) => {
    const { user } = useContext(AuthContext);
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
                docotrId: user.id,
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

            const data = await response.json();
            console.log("Turno creado:", data);

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
                            <div className="alert alert-danger">
                                Hubo un error al crear el turno. Por favor, intenta nuevamente.
                            </div>
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
