import React, { useState, useContext } from 'react';
import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBInput, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import ErrorForm from '../Error/ErrorForm';
import { AuthContext } from '../../context/AuthContext';

const FormAddDoctor = ({ open, setOpen, specialties }) => {
    const { user } = useContext(AuthContext);
    const [error, setError] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        dateOfBirth: '',
        password: '',
        specialtyId: '',
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

            const response = await fetch(`http://localhost:5190/api/Doctor/AddDoctor`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${user?.token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            });

            if (response?.ok) {
                setOpen(false);
            } else {
                setError(true);
            }

        } catch (error) {
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
                            <MDBModalTitle>Crear Doctor</MDBModalTitle>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <MDBRow className="g-3">
                                <MDBCol md="6">
                                    <MDBInput
                                        label="Nombre"
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        placeholder="Nombre"
                                        onChange={handleChange}
                                    />
                                </MDBCol>
                                <MDBCol md="6">
                                    <MDBInput
                                        label="Apellido"
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        placeholder="Apellido"
                                        onChange={handleChange}
                                    />
                                </MDBCol>
                            </MDBRow>

                            <MDBRow className="g-3 mt-2">
                                <MDBCol md="12">
                                    <MDBInput
                                        label="Correo Electrónico"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        placeholder="Correo Electrónico"
                                        onChange={handleChange}
                                    />
                                </MDBCol>
                            </MDBRow>

                            <MDBRow className="g-3 mt-2">
                                <MDBCol md="12">
                                    <MDBInput
                                        label="Contraseña"
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        placeholder="Contraseña"
                                        onChange={handleChange}
                                    />
                                </MDBCol>
                            </MDBRow>

                            <MDBRow className="g-3 mt-2">
                                <MDBCol md="12">
                                    <MDBInput
                                        label="Número de Teléfono"
                                        type="tel"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        placeholder="Número de Teléfono"
                                        onChange={handleChange}
                                    />
                                </MDBCol>
                            </MDBRow>

                            <MDBRow className="g-3 mt-2">
                                <MDBCol md="12">
                                    <MDBInput
                                        label="Fecha de Nacimiento"
                                        type="date"
                                        name="dateOfBirth"
                                        value={formData.dateOfBirth}
                                        onChange={handleChange}
                                    />
                                </MDBCol>
                            </MDBRow>

                            <MDBRow className="g-3 mt-2">
                                <MDBCol md="12">
                                    <select
                                        name="specialtyId"
                                        value={formData.specialtyId}
                                        onChange={handleChange}
                                        className="form-select"
                                    >
                                        <option value="">Seleccione una Especialidad</option>
                                        {specialties?.map((specialty) => (
                                            <option key={specialty.id} value={specialty.id}>
                                                {specialty.name}
                                            </option>
                                        ))}
                                    </select>
                                </MDBCol>
                            </MDBRow>

                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn type="submit" color="primary">
                                Crear
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

export default FormAddDoctor;