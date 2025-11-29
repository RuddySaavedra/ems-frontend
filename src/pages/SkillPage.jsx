import React from "react";
import { Routes, Route } from "react-router-dom";
import SkillList from "../components/Skill/SkillList";
import SkillForm from "../components/Skill/SkillForm";

/**
 * SkillPage — Gestiona rutas internas:
 * /skills, /skills/add, /skills/edit/:id
 */
const SkillPage = () => {
    return (
        <Routes>
            <Route index element={<SkillList />} />
            <Route path="add" element={<SkillForm />} />
            <Route path="edit/:id" element={<SkillForm />} />
        </Routes>
    );
};

export default SkillPage;
