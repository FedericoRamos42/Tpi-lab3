import React, { useState, useEffect } from 'react';
import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBInput, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import ErrorForm from '../Error/ErrorForm';

const FormEditProfile = ({ open, setOpen, userEdit, token }) => {
    const [error, setError] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        dateOfBirth: '',
        address: {
            street: '',
            province: '',
            city: '',
            postalCode: '',
        }
    });

    useEffect(() => {
        if (userEdit) {
            setFormData({
                name: userEdit.name || '',
                lastName: userEdit.lastName || '',
                email: userEdit.email || '',
                phoneNumber: userEdit.phoneNumber || '',
                dateOfBirth: userEdit.dateOfBirth ? userEdit.dateOfBirth.split("T")[0] : '',
                address: {
                    street: userEdit.address?.street || '',
                    province: userEdit.address?.province || '',
                    city: userEdit.address?.city || '',
                    postalCode: userEdit.address?.postalCode || '',
                }
            });
        }
    }, [userEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('address.')) {
            const addressField = name.split('.')[1];
            setFormData((prevData) => ({
                ...prevData,
                address: {
                    ...prevData.address,
                    [addressField]: value
                }
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError(false);
            const response = await fetch(`http://localhost:5190/api/${userEdit.role}/Update/${userEdit.id}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            localStorage.setItem('clinica-token', JSON.stringify(data));

            setOpen(false);
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
                            <MDBModalTitle>Modificar Usuario</MDBModalTitle>
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
                                        required
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
                                        required
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
                                        required
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
                                        required
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
                                        required
                                    />
                                </MDBCol>
                            </MDBRow>



                            {userEdit?.role === 'Patient' && (
                                <>
                                    <MDBRow className="g-3 mt-2">
                                        <MDBCol md="6">
                                            <MDBInput
                                                label="Calle"
                                                type="text"
                                                name="address.street"
                                                value={formData.address.street}
                                                placeholder="Calle"
                                                onChange={handleChange}
                                                required
                                            />
                                        </MDBCol>
                                        <MDBCol md="6">
                                            <MDBInput
                                                label="Provincia"
                                                type="text"
                                                name="address.province"
                                                value={formData.address.province}
                                                placeholder="Provincia"
                                                onChange={handleChange}
                                                required
                                            />
                                        </MDBCol>
                                    </MDBRow>

                                    <MDBRow className="g-3 mt-2">
                                        <MDBCol md="6">
                                            <MDBInput
                                                label="Ciudad"
                                                type="text"
                                                name="address.city"
                                                value={formData.address.city}
                                                placeholder="Ciudad"
                                                onChange={handleChange}
                                                required
                                            />
                                        </MDBCol>
                                        <MDBCol md="6">
                                            <MDBInput
                                                label="Código Postal"
                                                type="text"
                                                name="address.postalCode"
                                                value={formData.address.postalCode}
                                                placeholder="Código Postal"
                                                onChange={handleChange}
                                                required
                                            />
                                        </MDBCol>
                                    </MDBRow>
                                </>
                            )}
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn type="submit" color="primary">
                                Actualizar
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

export default FormEditProfile;