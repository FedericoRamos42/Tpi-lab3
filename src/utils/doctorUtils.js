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
}

export const fetchAppointmentDoctorById = async (user) => {
    const response = await fetch(`http://localhost:5190/api/Appointment/GetByDoctorId/${user?.id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    console.log(response)
    if (!response.ok) {
        throw new Error("Error fetching appointments");
    }
    const data = await response.json();
    return data
}
