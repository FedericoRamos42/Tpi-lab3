import React, { useEffect, useState } from 'react';


const EditProfile = () => {
    const [userData, setUserData] = useState(null);
    const [openEdit, setOpenEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const user = JSON.parse(localStorage.getItem('clinica-token')) || null;


    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                try {
                    setError(false);
                    setLoading(true);
                    const response = await fetch(`http://localhost:5190/api/${user.role}/${user.id}`);

                    if (!response.ok) {
                        throw new Error('Error al obtener los datos.');
                    }

                    const data = await response.json();
                    setUserData(data);
                } catch (error) {
                    setError(true);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, []);

    return (
        //Cargar formulario para editar perfil de usuarios 
        <>
        </>
    );
}

export default EditProfile;