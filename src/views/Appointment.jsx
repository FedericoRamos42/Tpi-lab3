import { useState, useEffect } from 'react';
import TableGeneric from '../components/Table/TableGeneric';
import { headerAppointment } from '../data/headerTable';
import { ComboBoxGeneric } from '../components/ComboBox';
import { fetchSpecialties } from '../utils/appointmentsUtils';

const Appointment = () => {
    const user = JSON.parse(localStorage.getItem("clinica-token"));
    
    const [specialtyOptions, setSpecialtyOptions] = useState([]);
    const [appointmentLocal, setAppointmentLocal] = useState([]);
    //const [selectedDate, setSelectedDate] = useState('');
    const [selectedSpecialty, setSelectedSpecialty] = useState('');
    
    const handleAssignAppointment = async (idAppointment, idPatient) => {

        const user = JSON.parse(localStorage.getItem("clinica-token"));

        try {
            const response = await fetch(`http://localhost:5190/api/Appointment/AssignAppointment`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idAppointment, idPatient }),
            });


            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        } catch (error) {
            // console.error("Error solicitando el turno:", error);
        }
    };

    const assign = appointmentLocal.map((appointment) => [
        {
            icon: 'add',
            color: 'primary',
            onClick: () => handleAssignAppointment(appointment.idAppointment, user.id),
        },
    ]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                console.log("Selected Specialty:", selectedSpecialty);
                
             
                const query = new URLSearchParams();
                if (selectedSpecialty) query.append('idSpecialty', selectedSpecialty); 
                // if (selectedDate) query.append('date', selectedDate);

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
                setAppointmentLocal(appointments); 
                console.log("Appointments fetched:", appointments);

            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchAppointments(); 
    }, [selectedSpecialty]); 

    useEffect(() => {
        const fetchSpecialty = async () => {
            try {
                const specialties = await fetchSpecialties()
                const formattedSpecialties = specialties.map(specialty => ({
                    value: specialty.id,  
                    label: specialty.name 
                }));
                setSpecialtyOptions(formattedSpecialties);
            } catch (error) {
                console.error("Error fetching specialties:", error);
            }
        };

        fetchSpecialty(); 
    }, []);

    return (
        <>
            <ComboBoxGeneric label="Especialidad" options={specialtyOptions} onSelect={setSelectedSpecialty} />
            <TableGeneric data={appointmentLocal} headers={headerAppointment} actions={assign}/>
        </>
    )

}

export default Appointment