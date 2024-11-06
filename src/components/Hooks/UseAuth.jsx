import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useAuth(user, requiredRole) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== requiredRole) {
      navigate("/");
    }
  }, [user, requiredRole, navigate]);
}
