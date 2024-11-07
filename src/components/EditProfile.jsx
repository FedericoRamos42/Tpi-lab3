import React, { useEffect, useState } from 'react';
import { MDBCard, MDBCardBody, MDBCardText, MDBCardImage, MDBBtn, MDBContainer, MDBRow, MDBCol, MDBSpinner } from 'mdb-react-ui-kit';
import Error from './Error/Error';
import  FormEditProfile  from './Form/FormEdit'
import imgProfileDefault from '../assets/profile-default.jpg';
 
const EditProfile = () => {
    const [userData, setUserData] = useState(null);
    const [openEdit, setOpenEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const user = JSON.parse(localStorage.getItem('clinica-token')) || null;


    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                try {
                    setError(false);
                    setLoading(true);
                    const response = await fetch(`http://localhost:5190/api/${user.role}/${user.id}`);
                    if (!response.ok) {
                        throw new Error('Error al obtener los datos.');
                    }

                    const data = await response.json();
                    console.log('esta es la respuesta de la api'+ data)

                    setUserData(data);
                } catch (error) {
                    setError(true);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, []);

    return (
        <MDBContainer className="py-2">
            <MDBCol>
                <MDBCol className='max-w-[400px]'>
                    <MDBCard className="mb-4 text-center border flex items-center">
                        <MDBCardBody>
                            <MDBCardImage
                                src={imgProfileDefault}
                                alt="User Avatar"
                                className="rounded-circle"
                                style={{ width: '150px' }}
                                fluid
                            />
                            <MDBCardText className="mt-4 font-semibold text-xl">
                                {userData?.name} {userData?.lastName}
                            </MDBCardText>
                            <MDBBtn color="primary" disabled={loading || error} onClick={() => setOpenEdit(true)}>Editar perfil</MDBBtn>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>

                <FormEditProfile open={openEdit} setOpen={setOpenEdit} userEdit={userData} token={user.token} />

                <MDBCol className='max-w-[400px] '>
                    <MDBCard className="mb-4 border">
                        {loading ? (
                            <div className='h-[400px] flex items-center justify-center'>
                                <MDBSpinner />
                            </div>
                        ) : error ? (
                            <div className='h-[400px] flex items-center justify-center p-12'>
                                <Error />
                            </div>
                        ) : (
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol sm="4">
                                        <MDBCardText>Nombre</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="8">
                                        <MDBCardText className="text-muted">{userData?.name}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="4">
                                        <MDBCardText>Apellido</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="8">
                                        <MDBCardText className="text-muted">{userData?.lastName}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="4">
                                        <MDBCardText>Email</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="8">
                                        <MDBCardText className="text-muted">{userData?.email}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="4">
                                        <MDBCardText>Telefono</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="8">
                                        <MDBCardText className="text-muted">{userData?.phoneNumber}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="4">
                                        <MDBCardText>Fecha de nacimiento</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="8">
                                        <MDBCardText className="text-muted">{new Date(userData?.dateOfBirth).toLocaleDateString('es-ES')}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                {userData && userData?.role === 'Patient' && (
                                    <div>
                                        <MDBRow>
                                            <MDBCol sm="4">
                                                <MDBCardText>Calle</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="8">
                                                <MDBCardText className="text-muted">{userData?.address?.street}</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                        <hr />
                                        <MDBRow>
                                            <MDBCol sm="4">
                                                <MDBCardText>Ciudad</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="8">
                                                <MDBCardText className="text-muted">{userData?.address?.city}</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                        <hr />
                                        <MDBRow>
                                            <MDBCol sm="4">
                                                <MDBCardText>Provincia</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="8">
                                                <MDBCardText className="text-muted">{userData?.address?.province}</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                        <hr />
                                        <MDBRow>
                                            <MDBCol sm="4">
                                                <MDBCardText>Codigo postal</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="8">
                                                <MDBCardText className="text-muted">{userData?.address?.postalCode}</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                    </div>
                                )}
                            </MDBCardBody>
                        )}
                    </MDBCard>
                </MDBCol>
            </MDBCol>
        </MDBContainer>
    );
}

export default EditProfile;