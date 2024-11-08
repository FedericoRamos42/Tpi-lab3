import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("clinica-token"));
        if (storedUser) setUser(storedUser);
    }, []);

    
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("clinica-token", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("clinica-token");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};