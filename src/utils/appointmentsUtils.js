export const fetchSpecialties = async () => {

    const response = await fetch('http://localhost:5190/api/Specialty/GetAllSpecialties');
    if (!response.ok) {
        throw new Error("Error fetching specialties");
    }
    const specialties = await response.json();
    return specialties;
}

export const fetchFilteredAppointment = async(query) =>{
    
    console.log("URL de la solicitud:", `http://localhost:5190/api/Appointment/Filtered?${query.toString()}`);
    const response = await fetch(`http://localhost:5190/api/Appointment/Filtered?${query.toString()}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error("Error en el fetch");
    }

    const appointments = await response.json();

    return appointments
}

export const fetchAssignAppointment = async(idAppointment, idPatient, user)=>{
    console.log(idAppointment,idPatient)
    const response = await fetch(`http://localhost:5190/api/Appointment/AssignAppointment`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idAppointment, idPatient }),
    });
    console.log(response)
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
}