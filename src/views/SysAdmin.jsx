import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { headerAdmin } from '../data/headerTable';
import { useAuth } from '../components/Hooks/UseAuth';
import { MDBBtn } from 'mdb-react-ui-kit';
import { ComboBoxGeneric } from '../components/ComboBox';
import { fetchDeleteUser, fetchFilteredUsers } from '../utils/adminUtils';
import { fetchSpecialties } from '../utils/appointmentsUtils';
import EditProfile from '../components/EditProfile';
import TableGeneric from '../components/Table/TableGeneric';
import FormAddDoctor from '../components/Form/FormAddDoctor';

const Admin = () => {
  const { user } = useContext(AuthContext)
  const [users, setUsers] = useState([]);
  const [stateFiltered, setStateFiltered] = useState(null);
  const [error, setErrorUsers] = useState(null);
  const [loading, setLoadingUsers] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [specialties, setSpecialties] = useState([]);

  useAuth(user, "Admin")

  const handleDeleteUsers = async (id) => {

    try {
      setErrorUsers(false)
      setLoadingUsers(true)
      await fetchDeleteUser(id)
      await fetchUsers()
      // setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    }
    catch {
      setErrorUsers(true)

    }
    finally {
      setLoadingUsers(false)
    }
  }

  const fetchSpecialty = async () => {
    try {
      const response = await fetchSpecialties();

      setSpecialties(response);
    } catch (error) { }
  };

  useEffect(() => {
    fetchSpecialty();
  }, [])

  const fetchUsers = async () => {
    const query = new URLSearchParams();
    if (stateFiltered) query.append('state', stateFiltered);
    try {
      setErrorUsers(false);
      setLoadingUsers(true);

      const res = await fetchFilteredUsers(query);

      setUsers(res);
    } catch (error) {
      setErrorUsers(true);
    } finally {
      setLoadingUsers(false);
    }
  };
  useEffect(() => {

    fetchUsers();
  }, [stateFiltered]);

  const actions = users.map((user) => [
    {
      icon: 'ban',
      color: 'danger',
      disable: user.status === 'Inactivo',
      onClick: () => handleDeleteUsers(user.id),
    },
  ]);

  return (
    <div className='flex'>
      <div className='w-1/4'>
        <EditProfile />
      </div>
      <div className='w-3/4'>
        <div className='flex items-center justify-end mr-4'>
          <ComboBoxGeneric label="Estado"
            options={[{ value: '', label: 'Todos los Estados' },
            { value: 'true', label: 'Activo' },
            { value: 'false', label: 'Inactivo' },]}
            onSelect={setStateFiltered}
          />
          <MDBBtn onClick={() => setOpenCreate(true)}>
            Crear Doctor
          </MDBBtn>
        </div>

        < div className='max-h-[600px] overflow-auto'>
          <TableGeneric headers={headerAdmin} data={users} actions={actions} loading={loading} error={error} />
        </div>
      </div>
      <FormAddDoctor open={openCreate} setOpen={setOpenCreate} specialties={specialties} />
    </div>
  );
};

export default Admin;


