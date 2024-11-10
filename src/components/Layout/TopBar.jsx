import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarItem, MDBNavbarLink, MDBCollapse, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

const TopBar = () => {
    const { user, logout } = useContext(AuthContext);
    return (
        <MDBNavbar expand='lg' light bgColor='light'>
            <MDBContainer fluid className='flex justify-between'>
                <MDBNavbarBrand tag={Link} to={'/'}>
                    <MDBIcon fas icon="user-md" size='xl' color='primary' className='pr-3' />
                    Clinica UTN
                </MDBNavbarBrand>
                <MDBCollapse navbar className='flex justify-end'>
                    <MDBNavbarNav >
                        <MDBNavbarItem>
                            <MDBNavbarLink tag={Link} to={'/'}>
                                Inicio
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        {user && user?.role === 'Patient' && (
                            <MDBNavbarItem>
                                <MDBNavbarLink tag={Link} to={'/appointment'}>
                                    Solicitar turno
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                        )}
                        <MDBNavbarItem>
                            <MDBNavbarLink tag={Link} to={'/contact'}>
                                Contacto
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            {user ? (
                                <MDBDropdown>
                                    <MDBDropdownToggle tag='a' className='nav-link' role='button'>
                                        {user?.name} {user?.lastName}
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu>
                                        <MDBDropdownItem link tag={Link} to={`/${user?.role}`} childTag='button'>
                                            Ir al perfil
                                        </MDBDropdownItem>
                                        <MDBDropdownItem link onClick={logout} childTag='button'>
                                            Cerrar sesión
                                        </MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            ) : (
                                <MDBNavbarLink tag={Link} to={`/login`} >
                                    Ingresar
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
