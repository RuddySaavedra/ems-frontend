
import api from "./api"; // importa el axios configurado con interceptores
const API_URL = "/skills";

export const getAllSkills = () => api.get(API_URL);
export const getSkillById = (id) => api.get(`${API_URL}/${id}`);
export const createSkill = (skill) => api.post(API_URL, skill);
export const updateSkill = (id, skill) => api.put(`${API_URL}/${id}`, skill);
export const deleteSkill = (id) => api.delete(`${API_URL}/${id}`);
