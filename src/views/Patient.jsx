import React, { useState, useEffect } from 'react';
import TableGeneric from '../components/Table/TableGeneric';
import { headerAppointmentAvailable } from '../data/headerTable';
import { cancelAppointment, fetchReservedAppointments } from '../utils/patientUtils';
import { useAuth } from '../components/Hooks/UseAuth';

const Patient = () => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [reserved, setReserved] = useState([]);

    const user = JSON.parse(localStorage.getItem('clinica-token')) || null;

    const handleCancelAppoitment = async (idAppointment) => {
        try {
            setError(false);

            await cancelAppointment(idAppointment, user?.token);

            setLoading(true);

            const res = await fetchReservedAppointments(user?.id);

            setReserved(res);
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    // Validar rol de usuario
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
          onClick: () => handleCancelAppoitment(appointment.idAppointment),
        },
      ]);

    return (
        <div>
            <TableGeneric data={reserved} headers={headerAppointmentAvailable} loading={loading} error={error}  actions={action}/>
        </div>
    )
}

export default Patient;