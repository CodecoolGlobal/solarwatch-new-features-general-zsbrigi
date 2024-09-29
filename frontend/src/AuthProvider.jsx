import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user')
        return storedUser ? JSON.parse(storedUser) : null
    });

    const login = async (data) => {
        setUser(data);
    };

    const logout = () => {
        setUser(null);
    };

    return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    return useContext(AuthContext);
};