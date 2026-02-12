import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const checkAuth = async () => {
        try {
            const userData = await api.getMe();
            if (userData) {
                setUser(userData);
                setIsAuthenticated(true);
                // Sync non-sensitive items to localStorage for legacy components that might read them directly
                if (userData.role) localStorage.setItem('userType', userData.role);
                if (userData.first_name) localStorage.setItem('firstName', userData.first_name);
                if (userData.user_id) localStorage.setItem('userId', userData.user_id);
            } else {
                setUser(null);
                setIsAuthenticated(false);
                localStorage.removeItem('userType');
                localStorage.removeItem('firstName');
                localStorage.removeItem('userId');
            }
        } catch (error) {
            // If 401, it throws.
            setUser(null);
            setIsAuthenticated(false);
            localStorage.removeItem('userType');
            localStorage.removeItem('firstName');
            localStorage.removeItem('userId');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();

        const handleAuthChange = () => {
            setLoading(true);
            checkAuth();
        };

        window.addEventListener('auth-change', handleAuthChange);
        return () => window.removeEventListener('auth-change', handleAuthChange);
    }, []);

    // Wrappers for api methods to expose via context if needed, 
    // though components can call api.login directly (which triggers auth-change)
    const login = async (identifier, password) => {
        const data = await api.login(identifier, password);
        return data;
    };

    const logout = async () => {
        await api.logout();
    };

    return (
        <AuthContext.Provider value={{ user, loading, isAuthenticated, login, logout, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
