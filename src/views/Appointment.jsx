import { useState, useEffect } from 'react';
import TableGeneric from '../components/Table/TableGeneric';
import { headerAppointment } from '../data/headerTable';
import { ComboBoxGeneric } from '../components/ComboBox';
import { fetchAssignAppointment, fetchFilteredAppointment, fetchSpecialties } from '../utils/appointmentsUtils';
import { MDBInput } from 'mdb-react-ui-kit';

const Appointment = () => {
    const user = JSON.parse(localStorage.getItem("clinica-token"));
    
    const [error, setError] = useState(false)
    const [loading,setLoading] = useState(false)
    const [specialtyOptions, setSpecialtyOptions] = useState([]);
    const [appointmentLocal, setAppointmentLocal] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedSpecialty, setSelectedSpecialty] = useState('');
    
    const handleAssignAppointment = async (idAppointment, idPatient) => {
        try {
            console.log(idAppointment,idPatient)
            setError(false);
            setLoading(true);
            await fetchAssignAppointment(idAppointment,idPatient,user)
            console.log("turno asignado con exito")
        } catch (error) {
            setError(true)
        } finally{
            setLoading(false)
        }
    };

    
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                setError(false)
                setLoading(true)
                const query = new URLSearchParams();
                if (selectedSpecialty) query.append('idSpecialty', selectedSpecialty); 
                if (selectedDate) query.append('date', selectedDate);
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
    }, [selectedSpecialty,selectedDate]); 
    
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
        
        <div className='flex'>
            <div className='h-1/4'>
            <ComboBoxGeneric label="Especialidad" options={specialtyOptions} onSelect={setSelectedSpecialty} />
            <MDBInput
                    label="Seleccionar fecha"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)} 
                    required
                    className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-gray-700 mb-4"
                />
            </div>
            <div className='w-full h-[650px] overflow-auto'>
                <TableGeneric data={appointmentLocal} headers={headerAppointment} actions={assign} error={error} loading={loading}/>
            </div>
        </div>
    )

}

export default Appointment