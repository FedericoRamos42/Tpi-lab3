import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import TableGeneric from '../components/Table/TableGeneric';
import { headerAdmin } from '../data/headerTable';
import FormEdit from '../components/Form/FormEdit'
import { useAuth } from '../components/Hooks/UseAuth';
import EditProfile from '../components/EditProfile';
import { ComboBoxGeneric } from '../components/ComboBox';
import { fetchDeleteUser, fetchFilteredUsers } from '../utils/adminUtils';
// import FormAddDoctor from '../components/Form/FormAddDoctor';
// import { fetchSpecialties } from '../utils/appointmentsUtils';

const Admin = () => {
  const {user} = useContext(AuthContext)
  console.log("User from loc0alStorage:", user);
  const [users, setUsers] = useState([]);
  const [stateFiltered, setStateFiltered] = useState(null);
  const [error, setErrorUsers] = useState(null);
  const [loading, setLoadingUsers] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

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


  const handleEditClick = (user) => {
    setUserToEdit(user);
    setIsEditModalOpen(true);
  };

  const actions = users.map((user) => [
    {
      icon: 'edit',
      color: 'primary',
      onClick: () => handleEditClick(user),
    },
    {
      icon: 'ban',
      color: 'danger',
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
      {isEditModalOpen && (
        <FormEdit
          open={isEditModalOpen}
          setOpen={setIsEditModalOpen}
          userEdit={userToEdit}
          token={user.token}
        />
      )}
    </div>
  );
};

export default Admin;


