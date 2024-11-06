import React from 'react';
import { MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarItem, MDBNavbarLink, MDBCollapse, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import imgProfile from '../../assets/profile-default.jpg'

const TopBar = () => {

    const user = JSON.parse(localStorage.getItem('clinica-token')) || null;



    return (
        <MDBNavbar expand='lg' light bgColor='light'>
            <MDBContainer fluid className='flex justify-between'>
                <MDBNavbarBrand>
                    <Link to={'/'} className='text-black'>
                        Clinica UTN
                    </Link>
                </MDBNavbarBrand>
                <MDBCollapse navbar className='flex justify-end'>
                    <MDBNavbarNav >
                        <MDBNavbarItem>
                            <MDBNavbarLink>
                                <Link to={'/'} className='text-black'>
                                    Inicio
                                </Link>
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        {user && user?.role === 'Patient' && (
                            <MDBNavbarItem>
                                <MDBNavbarLink>
                                    <Link to={'/appointment'} className='text-black'>
                                        Solicitar turno
                                    </Link>
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                        )}
                        <MDBNavbarItem>
                            <MDBNavbarLink>
                                <Link to={'/contact'} className='text-black'>
                                    Contacto
                                </Link>
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            {user ? (
                                <MDBNavbarLink>
                                    <Link to={`/${user?.role}`} className='text-black'>
                                        {user?.name} {user?.lastName}
                                    </Link>
                                </MDBNavbarLink>
                            ) : (
                                <MDBNavbarLink >
                                    <Link to={`/login`} className='text-black'>
                                        Ingresar
                                    </Link>
                                </MDBNavbarLink>
                            )}
                        </MDBNavbarItem>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    );
}

export default TopBar;
