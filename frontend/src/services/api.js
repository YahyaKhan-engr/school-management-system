import axios from 'axios';

// In production: set VITE_API_URL to your hosted PHP backend URL
// e.g. https://yourname.infinityfreeapp.com/api
// In development: Vite proxy handles /api → localhost/school-backend/api
const BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Auth token injection
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const login = (data) => api.post('/login.php', data);
export const register = (data) => api.post('/register.php', data);

export const getStudents = () => api.get('/students.php');
export const addStudent = (data) => api.post('/students.php', data);
export const updateStudent = (id, data) => api.put(`/students.php?id=${id}`, data);
export const deleteStudent = (id) => api.delete(`/students.php?id=${id}`);

export const getAdmissions = () => api.get('/admissions.php');
export const submitAdmission = (data) => api.post('/admissions.php', data);

export const getResults = (studentId) => api.get(`/results.php?student_id=${studentId}`);
export const uploadResult = (data) => api.post('/results.php', data);

export const getAttendance = (studentId) => api.get(`/attendance.php?student_id=${studentId}`);

export default api;
