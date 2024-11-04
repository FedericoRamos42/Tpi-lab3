import React, { useState } from 'react';
import { MDBInput, MDBBtn, MDBRow, MDBCol, MDBContainer } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

const FormRegister = () => {
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        passwordConfirm: '',
        dateOfBirth: '',
        address: {
            street: '',
            province: '',
            city: '',
            postalCode: '',
        }
    });

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
            const response = await fetch("http://localhost:5190/api/Patient/AddPatient", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(formData)
            })
            const data = await response.json();
            console.log("Respuesta del servidor:", data);

        } catch (error) {
            console.log(error)
        }
    };

    return (
        <MDBContainer className="p-4 p-md-5">
            <form onSubmit={handleSubmit} className="border border-gray-50 shadow-md p-12 rounded-lg">
                <h3 className="mb-4 text-center font-semibold text-4xl">Registro de Usuario</h3>
                <MDBRow>
                    <MDBCol md="6" className="mb-4">
                        <MDBInput
                            label="Nombre"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </MDBCol>
                    <MDBCol md="6" className="mb-4">
                        <MDBInput
                            label="Apellido"
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="6" className="mb-4">
                        <MDBInput
                            label="Correo Electrónico"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </MDBCol>
                    <MDBCol md="6" className="mb-4">
                        <MDBInput
                            label="Número de Teléfono"
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                        />
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="6" className="mb-4">
                        <MDBInput
                            label="Contraseña"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </MDBCol>
                    <MDBCol md="6" className="mb-4">
                        <MDBInput
                            label="Confirmar Contraseña"
                            type="password"
                            name="passwordConfirm"
                            value={formData.passwordConfirm}
                            onChange={handleChange}
                            required
                        />
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12" className="mb-4">
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
                <h5 className="mt-4 mb-3">Dirección</h5>
                <MDBRow>
                    <MDBCol md="12" className="mb-4">
                        <MDBInput
                            label="Calle"
                            type="text"
                            name="address.street"
                            value={formData.address.street}
                            onChange={handleChange}
                        />
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="4" className="mb-4">
                        <MDBInput
                            label="Provincia"
                            type="text"
                            name="address.province"
                            value={formData.address.province}
                            onChange={handleChange}
                        />
                    </MDBCol>
                    <MDBCol md="4" className="mb-4">
                        <MDBInput
                            label="Ciudad"
                            type="text"
                            name="address.city"
                            value={formData.address.city}
                            onChange={handleChange}
                        />
                    </MDBCol>
                    <MDBCol md="4" className="mb-4">
                        <MDBInput
                            label="Código Postal"
                            type="text"
                            name="address.postalCode"
                            value={formData.address.postalCode}
                            onChange={handleChange}
                        />
                    </MDBCol>
                </MDBRow>
                <MDBBtn type="submit" color="primary" className="mt-4 w-100">
                    Registrarse
                </MDBBtn>
                <p className="mt-6 text-center ">
                    ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>
                </p>
            </form>
        </MDBContainer>
    );
};

export default FormRegister;