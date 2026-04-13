import axios from 'axios';

// Using Vite proxy — requests go to /api/* and Vite forwards to http://localhost/school-backend/api/*
// This eliminates all CORS issues entirely
const BASE_URL = '/api';

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
