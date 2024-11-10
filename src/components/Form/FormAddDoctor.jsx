import React, { useState } from 'react';
import {
    MDBInput,
    MDBBtn,
    MDBRow,
    MDBCol,
    MDBContainer,
    MDBSpinner,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';

const FormAddDoctor = ({ specialties, user }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        dateOfBirth: '',
        specialtyId: 0,
    });
    const [selectedSpecialty, setSelectedSpecialty] = useState('Seleccionar especialidad');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSpecialtyChange = (id, name) => {
        setFormData((prevData) => ({
            ...prevData,
            specialtyId: id
        }));
        setSelectedSpecialty(name);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(false);
            const response = await fetch("http://localhost:5190/api/Doctor/AddDoctor", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${user?.token}`,
                    "content-type": "application/json",
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw response;
            }
            navigate('/login');
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <MDBContainer className="p-4 p-md-5 min-h-screen">
            <form onSubmit={handleSubmit} className="border border-gray-50 shadow-md p-12 rounded-lg">

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <strong className="font-bold">Error:</strong>
                        <span className="block sm:inline text-sm pl-2">No se pudo registrar el doctor. Por favor, verifica los datos e inténtalo de nuevo.</span>
                    </div>
                )}

                <h3 className="mb-4 text-center font-semibold text-4xl">Registro de Doctor</h3>
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
                            label="Teléfono"
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                        />
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="6" className="mb-4">
                        <MDBInput
                            label="Fecha de Nacimiento"
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            required
                        />
                    </MDBCol>
                    <MDBCol md="6" className="mb-4">
                        <MDBDropdown className="w-full">
                            <MDBDropdownToggle color="primary" className="w-full">
                                {selectedSpecialty}
                            </MDBDropdownToggle>
                            <MDBDropdownMenu>
                                {specialties.map((option) => (
                                    <MDBDropdownItem
                                        key={option.id}
                                        onClick={() => handleSpecialtyChange(option.id, option.name)}
                                    >
                                        {option.name}
                                    </MDBDropdownItem>
                                ))}
                            </MDBDropdownMenu>
                        </MDBDropdown>
                    </MDBCol>
                </MDBRow>
                <MDBBtn color="primary" type="submit" className="w-full">
                    {loading ? <MDBSpinner size="sm" role="status" /> : "Registrar"}
                </MDBBtn>
            </form>
        </MDBContainer>
    );
};

export default FormAddDoctor