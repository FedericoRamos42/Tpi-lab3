import { useState, useEffect } from 'react';
import TableGeneric from '../components/Table/TableGeneric';
import { headerAppointment } from '../data/headerTable';
import { ComboBoxGeneric } from '../components/ComboBox';
import { fetchAssignAppointment, fetchFilteredAppointment, fetchSpecialties } from '../utils/appointmentsUtils';

const Appointment = () => {
    const user = JSON.parse(localStorage.getItem("clinica-token"));
    
    const [error, setError] = useState(false)
    const [loading,setLoading] = useState(false)
    const [specialtyOptions, setSpecialtyOptions] = useState([]);
    const [appointmentLocal, setAppointmentLocal] = useState([]);
    //const [selectedDate, setSelectedDate] = useState('');
    const [selectedSpecialty, setSelectedSpecialty] = useState('');
    
    const handleAssignAppointment = async (idAppointment, idPatient) => {
        try {
            setError(false);
            setLoading(true);
            await fetchAssignAppointment(idAppointment,idPatient)
        } catch (error) {
            setError(true)
        } finally{
            setLoading(false)
        }
    };

    
    useEffect(() => {
        console.log("Especialidad seleccionada:", selectedSpecialty); 
        const fetchAppointments = async () => {
            try {
                setError(false)
                setLoading(true)
                const query = new URLSearchParams();
                if (selectedSpecialty) query.append('idSpecialty', selectedSpecialty); 
                
                const appointments = await fetchFilteredAppointment(query);
                setAppointmentLocal(appointments); 
                
            } 
            catch (error) {
                setError(true)
            }
            finally{
                setLoading(false)
            }
        };
        fetchAppointments(); 
    }, [selectedSpecialty]); 
    
    useEffect(() => {
        const fetchSpecialty = async () => {
            try {
                setError(false)
                setLoading(true)
                const specialties = await fetchSpecialties()
                const formattedSpecialties = specialties.map(specialty => ({
                    value: specialty.id,  
                    label: specialty.name 
                }));
                setSpecialtyOptions(formattedSpecialties);
                console.log("Especialidades cargadas:", formattedSpecialties); 
            } catch (error) {
               setError(true)
            }finally{
                setLoading(false)
            }
        };
        
        fetchSpecialty(); 
    }, []);
    
    const assign = appointmentLocal.map((appointment) => [
        {
            icon: 'add',
            color: 'primary',
            onClick: () => handleAssignAppointment(appointment.idAppointment, user.id),
        },
    ]);

    return (
        <>
          <ComboBoxGeneric label="Especialidad" options={specialtyOptions} onSelect={setSelectedSpecialty} />
            <TableGeneric data={appointmentLocal} headers={headerAppointment} actions={assign} error={error} loading={loading}/>
        </>
    )

}

export default Appointment