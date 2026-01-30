const BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000').replace(/\/$/, ''); // Adjust if backend runs elsewhere

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
            let msg;
            if (Array.isArray(json.detail)) {
                msg = json.detail.map(d => `${d.loc ? d.loc.join('.') + ': ' : ''}${d.msg}`).join('\n');
            } else if (typeof json.detail === 'object') {
                msg = json.detail.message || JSON.stringify(json.detail);
            } else {
                msg = json.detail;
            }
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

    // --- Skills ---
    getSkillById: async (skillId) => {
        const response = await fetch(`${BASE_URL}/api/v1/skills/${skillId}`, {
            headers: getHeaders()
        });
        return handleResponse(response);
    },

    // --- Question Templates ---

    // --- Question Templates (Unified v1 & v2) ---

    getQuestionTemplates: async (filters = {}) => {
        const params = new URLSearchParams();
        if (filters.grade) {
            params.append('grade_level', filters.grade); // For V1
            params.append('grade', filters.grade);       // For V2
        }
        if (filters.module) params.append('module', filters.module);
        if (filters.search) params.append('search', filters.search); // Search param
        if (filters.limit) params.append('limit', filters.limit);
        if (filters.offset) params.append('offset', filters.offset);
        const queryString = params.toString() ? `?${params.toString()}` : '';

        // Fetch v1 Templates
        const p1 = fetch(`${BASE_URL}/api/v1/question-templates${queryString}`, { headers: getHeaders() })
            .then(res => handleResponse(res))
            .then(data => ({ templates: data.templates || [], total: data.total || 0 }))
            .catch(err => { console.error("v1 fetch error", err); return { templates: [], total: 0 }; });

        // Fetch v2 Templates
        // Note: v2 list endpoint might have different filter params, adapting best effort
        const p2 = fetch(`${BASE_URL}/api/v1/question-generation-templates${queryString}`, { headers: getHeaders() })
            .then(res => handleResponse(res))
            .then(data => ({ templates: data.templates || [], total: data.total || 0 }))
            .catch(err => { console.error("v2 fetch error", err); return { templates: [], total: 0 }; });

        const [v1Data, v2Data] = await Promise.all([p1, p2]);

        // Normalize v2 to look like v1 for the UI
        const normalizedV2 = v2Data.templates.map(t => ({
            ...t,
            // Map v2 fields to v1 UI expectations
            module: t.category,       // v2 category -> v1 module
            topic: t.skill_name,      // v2 skill_name -> v1 topic
            grade_level: [t.grade],   // v2 int grade -> v1 array
            is_v2: true               // Flag to identify source
        }));

        // Combine
        return {
            templates: [...normalizedV2, ...v1Data.templates],
            total: v1Data.total + v2Data.total
        };
    },

    createQuestionTemplate: async (data) => {
        console.log("API: createQuestionTemplate called with:", data);
        if (!data) {
            console.error("API Error: data is null/undefined");
            throw new Error("Cannot save: data is missing");
        }

        // Always creates v2 now
        const response = await fetch(`${BASE_URL}/api/v1/question-generation-templates`, {
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
        // Check if v2 (data usually comes from form, but form might not know. 
        // Best reliance is if we pass a flag or check structure.
        // However, the `templateId` is the key. 
        // If the caller (QuestionTemplateForm) preserves the `is_v2` flag in the `template` object it received, 
        // we can use likely check `data.is_v2` if we pass it, OR try one endpoint then the other?
        // Better: The LIST passes the full object to Edit Form. Form saves it.
        // We will assume `data` contains `is_v2` if it was edit.

        let endpoint = `api/v1/question-templates/${templateId}`; // Default v1
        if (data.is_v2 || (data.question_template && data.answer_template)) {
            // Presence of v2 fields implies v2
            endpoint = `api/v1/question-generation-templates/${templateId}`;
        }

        const response = await fetch(`${BASE_URL}/${endpoint}`, {
            method: 'PATCH',
            headers: getHeaders(),
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },

    deleteQuestionTemplate: async (templateId, isV2 = false) => {
        const endpoint = isV2
            ? `api/v1/question-generation-templates/${templateId}`
            : `api/v1/question-templates/${templateId}`;

        const response = await fetch(`${BASE_URL}/${endpoint}`, {
            method: 'DELETE',
            headers: getHeaders()
        });
        if (response.status === 204) return true;
        return handleResponse(response);
    },

    previewQuestionTemplate: async (template, parameters = {}) => {
        if (template.is_v2) {
            return api.previewQuestionGeneration(template, parameters.count || 3);
        }
        const response = await fetch(`${BASE_URL}/api/v1/question-templates/${template.template_id}/preview`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(parameters),
        });
        return handleResponse(response);
    },

    previewQuestionGeneration: async (data, count = 3) => {
        const url = new URL(`${BASE_URL}/api/v1/question-generation-templates/preview`);
        url.searchParams.append('count', count);

        const response = await fetch(url.toString(), {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(data),
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

    uploadImage: async (file, grade) => {
        const formData = new FormData();
        formData.append('file', file);
        if (grade) {
            formData.append('grade', grade);
        }
        const response = await fetch(`${BASE_URL}/api/v1/upload`, {
            method: 'POST',
            // headers: getHeaders(), // Content-Type multipart/form-data is set automatically
            body: formData,
        });
        return handleResponse(response);
    },

    getUploaders: async () => {
        const response = await fetch(`${BASE_URL}/api/v1/auth/uploaders`, {
            headers: getHeaders()
        });
        return handleResponse(response);
    },
};
