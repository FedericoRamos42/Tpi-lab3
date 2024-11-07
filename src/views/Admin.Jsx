import React, { useState, useEffect } from 'react';
import TableGeneric from '../components/Table/TableGeneric';
import { headerAdmin } from '../data/headerTable';
import FormEdit from '../components/Form/FormEdit'
import { useAuth } from '../components/Hooks/UseAuth';
import EditProfile from '../components/EditProfile';
import { ComboBoxGeneric } from '../components/ComboBox';

const Admin = () => {
  const user = JSON.parse(localStorage.getItem("clinica-token"));
  const [users, setUsers] = useState([]);
  const [stateFiltered, setStateFiltered] = useState(null);
  const [error, setErrorUsers] = useState(null);
  const [loading, setLoadingUsers] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

  useAuth(user, "Admin")

  useEffect(() => {

    setLoadingUsers(true);
    setErrorUsers(null);

    fetch('http://localhost:5190/api/User/')
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching Users");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoadingUsers(false);
      })
      .catch((error) => {
        setErrorUsers(error.message);
        setLoadingUsers(false);
      });
  }, []);

  useEffect(() => {
    setLoadingUsers(true);
    setErrorUsers(null);

    const query = new URLSearchParams();
    if (stateFiltered) query.append('state', stateFiltered);

    fetch(`http://localhost:5190/api/User/Filtered?${query.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoadingUsers(false);
      })
      .catch((error) => {
        setErrorUsers(error);

      });
  }, [stateFiltered]);

  const handleDeleteAppointment = (id) => {
    fetch(`http://localhost:5190/api/User/Delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      })
      .catch((error) => {
        console.error("Error eliminando un usuario:", error);
      });
  };

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
      <ComboBoxGeneric label="Estado"
          options={[{ value: '', label: 'Todos los Estados' },
          { value: 'true', label: 'Activo' },
          { value: 'false', label: 'Inactivo' },]}
          onSelect={setStateFiltered}
        />
        <TableGeneric headers={headerAdmin} data={users} actions={actions} loading={loading} error={error} />
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


