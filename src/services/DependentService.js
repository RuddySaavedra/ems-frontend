import api from "./api"; // importa el axios configurado con interceptores

const API_URL = "/dependents";
const EMP_URL = "/employees";

export const getAllDependents = () => api.get(API_URL);
export const getDependentById = (id) => api.get(`${API_URL}/${id}`);
export const createDependent = (dependent) => api.post(API_URL, dependent);
export const updateDependent = (id, dependent) => api.put(`${API_URL}/${id}`, dependent);
export const deleteDependent = (id) => api.delete(`${API_URL}/${id}`);

// Related data
export const getAllEmployees = () => api.get(EMP_URL);
