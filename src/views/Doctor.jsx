import TableGeneric from '../components/Table/TableGeneric';
import { headerPatient } from '../data/headerTable'
import { useState, useEffect, useContext } from 'react';
import EditProfile from '../components/EditProfile';
import { useAuth } from '../components/Hooks/UseAuth';
import PropTypes from 'prop-types';
import { MDBBtn } from 'mdb-react-ui-kit';
import { cancelAppointment, fetchAppointmentDoctorById } from '../utils/doctorUtils';
import { AuthContext } from '../context/AuthContext';
import FormAddAppointment from '../components/Form/FormEditAppointment';

const Doctor = () => {
    const { user } = useContext(AuthContext)
    const [open, setOpen] = useState(false)

    if (!user || !user.id || !user.token) {
        console.error("Usuario no encontrado o no válido.");
        return;
    }

    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useAuth(user, 'Doctor');

    const handleCancelAppointment = async (idAppointment) => {
        try {

            await cancelAppointment(idAppointment)
            fetchAppointments();
        } catch (error) {
            console.error("Error solicitando el turno:", error);
        }

    };

    const fetchAppointments = async () => {
        try {
            const data = await fetchAppointmentDoctorById(user)
            setAppointments(data);
        } catch (error) {
            console.error("Error fetching appointments:", error);
            setError(true);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchAppointments();
    }, []);

    const canceled = appointments.map((appointment) => [
        {
            icon: 'ban',
            color: 'danger',
            onClick: () => handleCancelAppointment(appointment.id),
        },
    ]);

    return (
        <>
            <div className='flex'>
                <div className='w-1/4'>
                    <EditProfile />
                </div>
                <div className='w-3/4 p-6'>
                    <TableGeneric
                        data={appointments}
                        headers={headerPatient}
                        actions={canceled}
                        loading={loading}
                        error={error}
                    />
                </div>
                <div>
                    <MDBBtn onClick={()=>setOpen(true)}>Agregar turno</MDBBtn>
                </div>
                    <FormAddAppointment open={open} setOpen={setOpen}  user={user}/>
            </div>
        </>
    )
}

Doctor.propTypes = {

    user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        token: PropTypes.string.isRequired,
    }),

    // appointments: PropTypes.arrayOf(PropTypes.shape({
    //     id: PropTypes.string,
    // })).isRequired,

    loading: PropTypes.bool,

    error: PropTypes.bool,
};



export default Doctor