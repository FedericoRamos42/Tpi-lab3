import React from 'react';
import PropTypes from 'prop-types';

const ButtonStatus = ({ status }) => {
    const renderStatus = () => {
        switch (status) {
            case 'Available':
                return (
                    <span className='p-2 text-sm bg-green-600 shadow-md text-white rounded-2xl'> Disponible </span>
                );
            case 'Reserved':
                return (
                    <span className='p-2 text-sm bg-yellow-500 shadow-md text-white rounded-2xl'> Reservado </span>
                );
            case 'Cancel':
                return (
                    <span className='p-2 text-sm bg-red-600 shadow-md text-white rounded-2xl'> Cancelado </span>
                );
            case 'Activo':
                return (
                    <span className='p-2 text-sm bg-green-600 shadow-md text-white rounded-2xl'> Activo </span>
                );
            case 'Inactivo':
                return (
                    <span className='p-2 text-sm bg-red-600 shadow-md text-white rounded-2xl'> Inactivo </span>
                );
            default:
                return <span> - </span>;
        }
    };

    return <div>{renderStatus()}</div>;
};

ButtonStatus.propTypes = {
    status: PropTypes.oneOf(['Available', 'Reserved', 'Cancel', 'Activo','Inactivo']).isRequired,
};

export default ButtonStatus

