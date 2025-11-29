import api from "./api"; // importa el axios configurado con interceptores

const API_URL = "/employees";
const DEPT_URL = "/departments";
const SKILL_URL = "/skills";
const DEPENDENT_URL = "/dependents";

export const getAllEmployees = () => api.get(API_URL);
export const getEmployeeById = (id) => api.get(`${API_URL}/${id}`);
export const createEmployee = (employee) => api.post(API_URL, employee);
export const updateEmployee = (id, employee) => api.put(`${API_URL}/${id}`, employee);
export const deleteEmployee = (id) => api.delete(`${API_URL}/${id}`);

// Related data
export const getAllDepartments = () => api.get(DEPT_URL);
export const getAllSkills = () => api.get(SKILL_URL);
export const getDependentsByEmployee = (id) => api.get(`${DEPENDENT_URL}/byEmployee/${id}`);
