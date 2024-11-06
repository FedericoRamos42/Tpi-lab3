export const fetchReservedAppointments = async (id) => {
    const response = await fetch(`http://localhost:5190/api/Appointment/GetByPatientId/${id}`);

    if (!response.ok) {
        throw new Error("Error fetching appointments");
    }

    const data = await response.json();

    return data;
};

export const cancelAppointment = async (idAppointment) => {
    const response = await fetch(`http://localhost:5190/api/Appointment/Cancel/${idAppointment}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idAppointment }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
};