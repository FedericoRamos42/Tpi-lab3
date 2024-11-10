import { useState, useEffect } from 'react';
import TableGeneric from '../components/Table/TableGeneric';
import { headerAppointment } from '../data/headerTable';
import { ComboBoxGeneric } from '../components/ComboBox';
import { fetchAssignAppointment, fetchFilteredAppointment, fetchSpecialties } from '../utils/appointmentsUtils';
import { MDBInput } from 'mdb-react-ui-kit';

const Appointment = () => {
    const user = JSON.parse(localStorage.getItem("clinica-token"));

    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [specialtyOptions, setSpecialtyOptions] = useState([]);
    const [appointmentLocal, setAppointmentLocal] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedSpecialty, setSelectedSpecialty] = useState('');

    const handleAssignAppointment = async (idAppointment, idPatient) => {
        try {
            setError(false);
            setLoading(true);
            await fetchAssignAppointment(idAppointment, idPatient, user)

            await fetchAppointments();
        } catch (error) {
            setError(true)
        } finally {
            setLoading(false)
        }
    };


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
        finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, [selectedSpecialty, selectedDate]);

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
            } catch (error) {
                setError(true)
            } finally {
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

        <div className='flex flex-col items-center justify-center '>
            <div className='w-full flex items-center justify-end'>
                <div className='w-[400px] flex flex-row-reverse items-center'>
                    <ComboBoxGeneric label="Especialidad" options={specialtyOptions} onSelect={setSelectedSpecialty} />
                    <MDBInput
                        label="Seleccionar fecha"
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        required
                    />
                </div>
            </div>
            <div className='w-full flex items-center justify-center '>
                <div className='h-[650px] overflow-auto w-[90%]'>
                    <TableGeneric data={appointmentLocal} headers={headerAppointment} actions={assign} error={error} loading={loading} />
                </div>
            </div>
        </div>
    )

}

export default Appointment