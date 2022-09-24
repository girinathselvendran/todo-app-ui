import axios from "axios";

export const API = "http://localhost:4000";
// export const API = "https://giri-todo-node-api.herokuapp.com";
// export const API = "https://todo-app-using-ionic.herokuapp.com";

export const sendOTP = (data) => {
  return axios.post(`${API}/api/v1/sendOTP`, data);
};
export const verifyOTP = (data) => {
  return axios.post(`${API}/api/v1/verifyOTP`, data);
};

export const signupService = (data) => {
  return axios.post(`${API}/api/v1/signup`, data);
};

export const signinService = (data) => {
  return axios.post(`${API}/api/v1/signin`, data);
};

export const createService = (data) => {
  return axios.post(`${API}/api/v1/createtodo`, data);
};

export const getTodoService = (eamilId) => {
  return axios.get(`${API}/api/v1/gettodo/${eamilId}`);
};

export const updateService = (id, data) => {
  return axios.put(`${API}/api/v1/updatetodo/${id}`, data);
};

export const deleteService = (id) => {
  return axios.delete(`${API}/api/v1/deletetodo/${id}`);
};

//payment

export const savePayments = (id) => {
  return axios.post(`${API}/api/v1/savePaymentHistory/${id}`);
};
