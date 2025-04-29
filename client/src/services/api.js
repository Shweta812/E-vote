import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',  // make sure this matches your backend
  withCredentials: true,
});

// Attach token automatically
API.interceptors.request.use(config => {
  const stored = localStorage.getItem('user');
  if (stored) {
    const { token } = JSON.parse(stored);
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const signupRequest = data => API.post('/auth/signup', data);
export const loginRequest  = data => API.post('/auth/login', data);
export const fetchElections = () => API.get('/elections');
export const fetchElection  = id => API.get(`/elections/${id}`);
export const submitVote     = (id, vote) => API.post(`/elections/${id}/vote`, { candidateId: vote });