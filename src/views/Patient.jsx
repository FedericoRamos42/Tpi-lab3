import React, { useState, useEffect } from 'react';
import TableGeneric from '../components/Table/TableGeneric';
import { headerAppointmentAvailable } from '../data/headerTable';

const Patient = () => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [reserved, setReserved] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                setError(false);
                setLoading(true);

                const response = await fetch(`http://localhost:5190/api/Appointment/GetByPatientId/${user.id}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${user.token}`,
                        "Content-Type": "application/json"
                    }
                })

                if (!response.ok) {
                    throw new Error("Error fetching appointments");
                }

                const data = await response.json();

                setReserved(data);
            } catch (error) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    return (
        <div>
            <TableGeneric data={reserved} headers={headerAppointmentAvailable} loading={loading} error={error} />
        </div>
    )
}

export default Patient;