import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import TableGeneric from '../components/Table/TableGeneric';
import { headerAdmin } from '../data/headerTable';
import { useAuth } from '../components/Hooks/UseAuth';
import EditProfile from '../components/EditProfile';
import { ComboBoxGeneric } from '../components/ComboBox';
import { fetchDeleteUser, fetchFilteredUsers } from '../utils/adminUtils';

const Admin = () => {
  const { user } = useContext(AuthContext)
  const [users, setUsers] = useState([]);
  const [stateFiltered, setStateFiltered] = useState(null);
  const [error, setErrorUsers] = useState(null);
  const [loading, setLoadingUsers] = useState(false);

  useAuth(user, "Admin")

  const handleDeleteAppointment = async (id) => {

    try {
      setErrorUsers(false)
      await fetchDeleteUser(id)
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      setLoadingUsers(true)
    }
    catch {
      setErrorUsers(true)

    }
    finally {
      setLoadingUsers(false)
    }
  }


  useEffect(() => {
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
    
    fetchUsers()
  }, [stateFiltered]);

  const actions = users.map((user) => [
    {
      icon: 'ban',
      color: 'danger',
      disable: user.status === 'Inactivo',
      onClick: () => handleDeleteAppointment(user.id),
    },
  ]);

  return (
    <div className='flex'>
      <div className='w-1/4'>
        <EditProfile />
      </div>
      <div className='w-3/4'>
        <div>
          <ComboBoxGeneric label="Estado"
            options={[{ value: '', label: 'Todos los Estados' },
            { value: 'true', label: 'Activo' },
            { value: 'false', label: 'Inactivo' },]}
            onSelect={setStateFiltered}
          />
        </div>

        < div className='max-h-[600px] overflow-auto'>
          <TableGeneric headers={headerAdmin} data={users} actions={actions} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
};

export default Admin;


