import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarItem, MDBNavbarLink, MDBCollapse, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem,MDBIcon } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

const TopBar = () => {
    const { user, logout } = useContext(AuthContext);
    return (
        <MDBNavbar expand='lg' light bgColor='light'>
            <MDBContainer fluid className='flex justify-between'>
                <MDBNavbarBrand>
                    <Link to={'/'} className='text-black '>
                        <MDBIcon fas icon="user-md" size='xl' color='primary' className='pr-3'/>
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
                                <MDBDropdown>
                                    <MDBDropdownToggle tag='a' className='nav-link' role='button'>
                                        {user?.name} {user?.lastName}
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu>
                                        <Link to={`/${user?.role}`}>
                                            <MDBDropdownItem link>Ir al perfil</MDBDropdownItem>
                                        </Link>
                                        <MDBDropdownItem link onClick={logout}>Cerrar sesion</MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
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
