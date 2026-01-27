const BASE_URL = 'http://localhost:8000'; // Adjust if backend runs elsewhere

const getHeaders = () => {
    const token = localStorage.getItem('authToken');
    return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
};

// Helper to handle API response wrapper
const handleResponse = async (response) => {
    if (response.status === 401) throw new Error('Unauthorized');

    // Attempt to parse JSON
    let json;
    try {
        json = await response.json();
    } catch (e) {
        if (!response.ok) throw new Error(response.statusText || 'API Error');
        return null; // or throw?
    }

    if (!response.ok) {
        // Handle FastAPI style errors (detail array or string)
        if (json.detail) {
            const msg = Array.isArray(json.detail)
                ? json.detail.map(d => `${d.loc ? d.loc.join('.') + ': ' : ''}${d.msg}`).join('\n')
                : json.detail;
            throw new Error(msg);
        }
        // Handle APIResponse style errors
        if (json.error) {
            throw new Error(json.error.message || 'API Error');
        }
        throw new Error('API Error: ' + response.status);
    }

    if (json.success === false) {
        throw new Error(json.error?.message || 'API Error');
    }

    // If backend returns { success: true, data: ... }, return data.
    // If backend returns raw data (legacy?), return json.
    return json.success !== undefined ? json.data : json;
};

export const api = {
    // --- Auth ---
    login: async (username, password) => {
        const response = await fetch(`${BASE_URL}/api/v1/auth/admin-login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Login failed');
        }
        const data = await response.json();
        localStorage.setItem('authToken', data.access_token);
        return data;
    },

    logout: () => {
        localStorage.removeItem('authToken');
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('authToken');
    },

    // --- Question Templates ---

    getQuestionTemplates: async (filters = {}) => {
        const params = new URLSearchParams();
        if (filters.grade) params.append('grade_level', filters.grade);
        if (filters.module) params.append('module', filters.module);
        if (filters.limit) params.append('limit', filters.limit);
        if (filters.offset) params.append('offset', filters.offset);

        // Filter empty params
        const queryString = params.toString() ? `?${params.toString()}` : '';

        const response = await fetch(`${BASE_URL}/api/v1/question-templates${queryString}`, {
            headers: getHeaders()
        });
        return handleResponse(response);
    },

    createQuestionTemplate: async (data) => {
        const response = await fetch(`${BASE_URL}/api/v1/question-templates`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },

    getGradeSyllabus: async (gradeId) => {
        const id = typeof gradeId === 'string' ? gradeId.replace('grade', '') : gradeId;
        const response = await fetch(`${BASE_URL}/api/v1/question-templates/syllabus/${id}`, {
            headers: getHeaders()
        });
        return handleResponse(response);
    },

    getSyllabusConfig: async (grade) => {
        const response = await fetch(`${BASE_URL}/api/v1/question-templates/syllabus-config/${grade}`, {
            headers: getHeaders()
        });
        // API returns { success: true, data: ... } or null data
        return handleResponse(response);
    },

    saveSyllabusConfig: async (grade, config) => {
        const response = await fetch(`${BASE_URL}/api/v1/question-templates/syllabus-config/${grade}`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({ config }),
        });
        return handleResponse(response);
    },

    updateQuestionTemplate: async (templateId, data) => {
        const response = await fetch(`${BASE_URL}/api/v1/question-templates/${templateId}`, {
            method: 'PATCH',
            headers: getHeaders(),
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },

    deleteQuestionTemplate: async (templateId) => {
        const response = await fetch(`${BASE_URL}/api/v1/question-templates/${templateId}`, {
            method: 'DELETE',
            headers: getHeaders()
        });
        if (response.status === 204) return true;
        return handleResponse(response);
    },

    previewQuestionTemplate: async (templateId, parameters = {}) => {
        const response = await fetch(`${BASE_URL}/api/v1/question-templates/${templateId}/preview`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(parameters),
        });
        return handleResponse(response);
    },

    // Public practice endpoint (no auth required)
    getPracticeQuestions: async (templateId, count = 10) => {
        const response = await fetch(`${BASE_URL}/api/v1/question-templates/${templateId}/practice?count=${count}`, {
            headers: { 'Content-Type': 'application/json' }  // No auth token
        });
        return handleResponse(response);
    },

    // --- Question Generation ---

    createGenerationJob: async (templateId, count = 1) => {
        const response = await fetch(`${BASE_URL}/api/v1/question-generation-jobs`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({ template_id: templateId, requested_count: count }),
        });
        return handleResponse(response);
    },

    getGenerationJob: async (jobId) => {
        const response = await fetch(`${BASE_URL}/api/v1/question-generation-jobs/${jobId}`, {
            headers: getHeaders()
        });
        return handleResponse(response);
    },

    getGeneratedQuestionStats: async () => {
        const response = await fetch(`${BASE_URL}/api/v1/generated-questions/stats`, {
            headers: getHeaders()
        });
        return handleResponse(response);
    },

    getGeneratedQuestions: async (filters = {}) => {
        const params = new URLSearchParams();
        if (filters.jobId) params.append('job_id', filters.jobId);
        if (filters.templateId) params.append('template_id', filters.templateId);
        if (filters.limit) params.append('limit', filters.limit);
        if (filters.random) params.append('random', 'true');

        const url = `${BASE_URL}/api/v1/generated-questions?${params.toString()}`;

        const response = await fetch(url, {
            headers: getHeaders()
        });
        return handleResponse(response);
    },
    createUploader: async (name) => {
        const response = await fetch(`${BASE_URL}/api/v1/auth/create-uploader`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...getHeaders()
            },
            body: JSON.stringify({ name })
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Failed to create uploader');
        }
        return response.json();
    },

    uploaderLogin: async (username, accessCode) => {
        const response = await fetch(`${BASE_URL}/api/v1/auth/uploader-login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, access_code: accessCode })
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Login failed');
        }
        const data = await response.json();
        localStorage.setItem('authToken', data.access_token);
        localStorage.setItem('userType', data.user_type);
        if (data.username) {
            localStorage.setItem('userName', data.username);
        }
        return data;
    },

    getUploaders: async () => {
        const response = await fetch(`${BASE_URL}/api/v1/auth/uploaders`, {
            headers: getHeaders()
        });
        return handleResponse(response);
    },
};
