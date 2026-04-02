import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (email, password) => api.post('/auth/login', { email, password }).then(res => res.data),
};

// Job APIs
export const jobAPI = {
  getAllApproved: () => api.get('/jobs').then(res => res.data),
  getMyJobs: () => api.get('/jobs/my').then(res => res.data),
  createJob: (jobData) => api.post('/jobs', jobData).then(res => res.data),
  updateJob: (id, jobData) => api.put(`/jobs/${id}`, jobData).then(res => res.data),
  deleteJob: (id) => api.delete(`/jobs/${id}`).then(res => res.data),
};

// Admin APIs
export const adminAPI = {
  getAllUsers: () => api.get('/admin/users').then(res => res.data),
  getAllJobs: () => api.get('/admin/jobs').then(res => res.data),
  approveJob: (id) => api.put(`/admin/approve/${id}`).then(res => res.data),
  rejectJob: (id) => api.put(`/admin/reject/${id}`).then(res => res.data),
};

export default api;