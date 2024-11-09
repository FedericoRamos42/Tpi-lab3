import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { user , loading} = useContext(AuthContext);

    if (loading) return <div>Cargando...</div>;

    if (!user) {
        return <Navigate to="/" />;
    }
    return children;
};

export default ProtectedRoute;