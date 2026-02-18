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
                // Sync non-sensitive items to sessionStorage for legacy components that might read them directly
                if (userData.role) sessionStorage.setItem('userType', userData.role);
                if (userData.first_name) sessionStorage.setItem('firstName', userData.first_name);
                if (userData.user_id) sessionStorage.setItem('userId', userData.user_id);
            } else {
                setUser(null);
                setIsAuthenticated(false);
                sessionStorage.removeItem('userType');
                sessionStorage.removeItem('firstName');
                sessionStorage.removeItem('userId');
            }
        } catch (error) {
            console.error("AuthContext Check Failed:", error);
            // Only clear storage if explicitly unauthorized (401)
            // or if we decide network errors should logout (safer UI wise but maybe annoying).
            // For now, let's clear ONLY if we are sure it's an auth failure, not network.
            const isAuthError = error.message.includes('401') || error.message.includes('Unauthorized');

            if (isAuthError) {
                setUser(null);
                setIsAuthenticated(false);
                sessionStorage.removeItem('userType');
                sessionStorage.removeItem('firstName');
                sessionStorage.removeItem('userId');
                sessionStorage.removeItem('access_token'); // Also ensure token is gone if 401
            }
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
