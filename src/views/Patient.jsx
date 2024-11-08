import React, { useState, useEffect } from 'react';
import { headerAppointmentAvailable } from '../data/headerTable';
import { cancelAppointment, fetchReservedAppointments } from '../utils/patientUtils';
import { useAuth } from '../components/Hooks/UseAuth';
import TableGeneric from '../components/Table/TableGeneric';
import EditProfile from '../components/EditProfile';
import ConfirmAction from '../components/ConfirmAction';

const Patient = () => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [reserved, setReserved] = useState([]);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [appointmentReserved, setAppointmentReserved] = useState({});

    const messageConfirm = '¿Estás seguro de que deseas cancelar este turno?';

    const user = JSON.parse(localStorage.getItem('clinica-token')) || null;


    useAuth(user, 'Patient');

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                setError(false);
                setLoading(true);

                const res = await fetchReservedAppointments(user?.id);

                setReserved(res);
            } catch (error) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    const action = reserved.map((appointment) => [
        {
            icon: 'ban',
            color: 'danger',
            onClick: () => handleOpenConfirm(appointment),
        },
    ]);

    
    const handleCancelAppoitment = async () => {
        try {
            setError(false);

            await cancelAppointment(appointmentReserved.idAppointment, user?.token);

            setLoading(true);

            const res = await fetchReservedAppointments(user?.id);

            setReserved(res);
        } catch (error) {
            setError(true);
        } finally {
            setOpenConfirm(false);
            setLoading(false);
        }
    };

    const handleOpenConfirm = (appointments) => {
        setAppointmentReserved(appointments);
        setOpenConfirm(true);
    };

    return (
        <div className='flex'>
            <ConfirmAction openConfirm={openConfirm} message={messageConfirm} action={handleCancelAppoitment} setOpenConfirm={setOpenConfirm}/>
            <div className='w-1/4'>
                <EditProfile />
            </div>
            <div className='w-3/4 p-6'>
                <TableGeneric data={reserved} headers={headerAppointmentAvailable} loading={loading} error={error} actions={action} />
            </div>
        </div>
    )
}

export default Patient;