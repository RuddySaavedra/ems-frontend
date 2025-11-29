import React from "react";
import { Routes, Route } from "react-router-dom";
import EmployeeSkillList from "../components/EmployeeSkill/EmployeeSkillList";
import EmployeeSkillForm from "../components/EmployeeSkill/EmployeeSkillForm";

/**
 * EmployeeSkillPage — Gestiona rutas internas:
 * /employee-skills, /employee-skills/add, /employee-skills/edit/:id
 */
const EmployeeSkillPage = () => {
    return (
        <Routes>
            <Route index element={<EmployeeSkillList />} />
            <Route path="add" element={<EmployeeSkillForm />} />
            <Route path="edit/:id" element={<EmployeeSkillForm />} />
        </Routes>
    );
};

export default EmployeeSkillPage;
