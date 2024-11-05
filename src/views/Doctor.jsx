import TableGeneric from '../components/Table/TableGeneric';
import { headerPatient } from '../data/headerTable'
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';


const Doctor = () => {
    const user = JSON.parse(localStorage.getItem("clinica-token"));
    
    if (!user || !user.id || !user.token) 
    {
        console.error("Usuario no encontrado o no válido.");
        return;
    }

    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleCancelAppointment = async (idAppointment) => {
        console.log(idAppointment)
        try {
            const response = await fetch(`http://localhost:5190/api/Appointment/Cancel/${idAppointment}`, {
                method: 'PUT',
                headers: {
                    // 'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idAppointment }),
            });

            console.log(response)

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Esta es la respuesta del fetch', data);

        } catch (error) {
            console.error("Error solicitando el turno:", error);
        }

    };

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch(`http://localhost:5190/api/Appointment/GetByDoctorId/${user.id}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${user.token}`,
                        "Content-Type": "application/json"
                    }
                })
                console.log(response)
                if (!response.ok) {
                    throw new Error("Error fetching appointments");
                }
                const data = await response.json();
                console.log(data);
                setAppointments(data);
            } catch (error) {
                console.error("Error fetching appointments:", error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchAppointments();
    }, [user.id]);//

    const canceled = appointments.map((appointment) => [
        {
            icon: 'ban',
            color: 'danger',
            onClick: () => handleCancelAppointment(appointment.id),
        },
    ]);

    return (
        <>
            <TableGeneric
                data={appointments}
                headers={headerPatient}
                actions={canceled}
                loading={loading}
                error={error}
            />
        </>
    )
}

Doctor.propTypes = {

    user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        token: PropTypes.string.isRequired,
    }),

    appointments: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
    })).isRequired,

    loading: PropTypes.bool,

    error: PropTypes.bool,
};



export default Doctor