import React from 'react'
import TableGeneric from '../components/Table/TableGeneric';
import { headerAdmin } from '../data/headerTable';
const Admin = () => {

    const token = JSON.parse(localStorage.getItem("clinica-token"));
    const [users, setUsers] = useState([]);
    const [stateFiltered, setStateFiltered] = useState(null);
    
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [errorUsers, setErrorUsers] = useState(null);
  
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
            setErrorUsers(error.message);
            setLoadingUsers(false);
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
  return (
    <div>
      
    </div>
  )
}

export default Admin

