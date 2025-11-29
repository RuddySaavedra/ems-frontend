// src/services/EmployeeSkillService.js
import api from "./api"; // importa el axios configurado con interceptores

// ⚙️ Cambia el puerto si tu backend usa otro (por ejemplo 9090)
const BASE_URL = "https://emsback-production.up.railway.app/api";

/**
 * ============================================================
 * FUNCIONES CRUD RELACIONADAS CON EMPLOYEE - SKILLS
 * ============================================================
 */

/**
 * 🔹 Obtiene todas las relaciones employee-skill
 * (solo si tienes un endpoint general /employee-skills en tu backend)
 */
export const getAllEmployeeSkills = () =>
    api.get(`${BASE_URL}/employee-skills`).catch(() => []);

/**
 * 🔹 Obtiene todas las skills asignadas a un empleado
 */
export const getSkillsByEmployee = (employeeId) =>
    api.get(`${BASE_URL}/employees/${employeeId}/skills`);

/**
 * 🔹 Obtiene una relación específica Employee-Skill
 * (usado en el formulario al editar)
 */
export const getEmployeeSkillById = (relationId) =>
    api.get(`${BASE_URL}/employee-skills/${relationId}`);

export const assignSkill = (relation) => api.post(`${BASE_URL}/employee-skills/assign`, relation);
export const removeSkill = (employeeSkillRequest) =>
    api.delete(`${BASE_URL}/employee-skills/remove`, { data: employeeSkillRequest });


/**
 * ============================================================
 * FUNCIONES AUXILIARES
 * ============================================================
 */

/**
 * 🔹 Obtiene todos los empleados
 */
export const getAllEmployees = () => api.get(`${BASE_URL}/employees`);

/**
 * 🔹 Obtiene todas las skills disponibles
 */
export const getAllSkills = () => api.get(`${BASE_URL}/skills`);

/**
 * 🔹 Elimina una relación Employee-Skill
 * Compatible con el endpoint DELETE /api/employee-skills/remove
 */
export const deleteEmployeeSkill = async (employeeId, skillId) => {
    try {
        const payload = { employeeId, skillId };
        const response = await api.delete(`${BASE_URL}/employee-skills/remove`, { data: payload });
        return response.data;
    } catch (error) {
        console.error("❌ Error al eliminar habilidad del empleado:", error);
        throw error;
    }
};
