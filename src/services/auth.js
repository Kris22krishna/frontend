export const authService = {
    /**
     * Registers a new user with email and password.
     * @param {Object} data - { email, password, role }
     * @returns {Promise} - Response from the server
     */
    async registerWithEmail(data) {
        // START: Scalable API Pattern
        // In a real app, you would use axios or fetch with a base URL from environment variables.
        // Example: const response = await api.post('/auth/register', data);

        console.log('Simulating API call for:', data);

        return new Promise((resolve, reject) => {
            // Simulate network delay
            setTimeout(() => {
                // Simulate basic validation check on "server"
                if (data.email.includes("error")) {
                    reject(new Error("Email already exists"));
                } else {
                    resolve({ success: true, userId: "user_" + Math.random().toString(36).substr(2, 9), role: data.role });
                }
            }, 1000);
        });
        // END: Scalable API Pattern
    },

    /**
     * Initiates Google OAuth flow.
     * This is where you would integrate with @react-oauth/google or similar.
     */
    async loginWithGoogle() {
        console.log('Initiating Google Login...');
        // Implementation depends on the library used.
        // Usually involves redirecting or opening a popup.
    }
};
