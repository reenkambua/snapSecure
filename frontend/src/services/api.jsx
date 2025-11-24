// src/services/api.js
import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

export const loginUser = async (email, password) => {
  const res = await axios.post(`${API_BASE_URL}/token/`, { email, password });
  return res.data;
};

export const signupUser = async (username, email, password) => {
  const res = await axios.post(`${API_BASE_URL}/signup/`, { username, email, password });
  return res.data;
};

export const fetchDevices = async (token) => {
  const res = await axios.get(`${API_BASE_URL}/devices/`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const fetchIntruderLogs = async (token) => {
  const res = await axios.get(`${API_BASE_URL}/intruder-logs/`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
