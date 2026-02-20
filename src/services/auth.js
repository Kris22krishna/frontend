import { api } from './api';
import { auth, googleProvider, signInWithPopup } from '../firebase';

export const authService = {
    /**
     * Registers a new user with email and password.
     * @param {Object} data - { email, password, role }
     * @returns {Promise} - Response from the server
     */
    async registerWithEmail(data) {
        try {
            // Map frontend data to backend schema (V2)
            const payload = {
                name: data.name,
                role: data.role,
                email: data.email || null,
                password: data.password,
                phone_number: data.phoneNumber,
                class_name: data.grade, // Mapping grade to class_name
            };

            const response = await api.register(payload);
            return response;
        } catch (error) {
            // Rethrow the error to be handled by the component
            throw error;
        }
    },

    async checkEmail(email) {
        try {
            return await api.checkEmail(email);
        } catch (error) {
            console.error("Email check failed:", error);
            // If check fails (e.g., 500 error), we might want to let the user proceed 
            // and let the actual registration handle the error.
            return { available: true };
        }
    },

    async predictUsername(name, role) {
        try {
            const result = await api.predictUsername(name, role);
            return result.username;
        } catch (error) {
            console.error("Username prediction failed:", error);
            return null;
        }
    },

    async loginWithEmail(email, password) {
        try {
            const response = await api.login(email, password);
            // Store the token (api.login does this, but good to be explicit or if we need side effects)
            return response;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Initiates Google OAuth flow.
     * This is where you would integrate with @react-oauth/google or similar.
     */
    /**
     * Initiates Google OAuth flow.
     */
    /**
     * Initiates Google OAuth flow.
     */
    async loginWithGoogle(role = null, googleUser = null) {
        try {
            let user = googleUser;
            if (!user) {
                if (!auth || !googleProvider) {
                    throw new Error("Google Login is not configured. Please contact support.");
                }
                const result = await signInWithPopup(auth, googleProvider);
                user = result.user;
            }

            // Send user details to backend
            const payload = {
                email: user.email,
                first_name: user.displayName ? user.displayName.split(' ')[0] : 'User',
                last_name: user.displayName ? user.displayName.split(' ').slice(1).join(' ') : '',
                google_id: user.uid,
                photo_url: user.photoURL,
                role: role // Optional: Only if registering
            };

            const response = await api.googleLogin(payload);

            // If backend says we need a role, return that info along with the user object
            if (response.needs_role) {
                return { ...response, googleUser: user };
            }

            return response;
        } catch (error) {
            console.error("Google Login Error:", error);
            throw error;
        }
    }
};
