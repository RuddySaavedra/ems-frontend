import React from "react";
import { Routes, Route } from "react-router-dom";
import DepartmentList from "../components/Department/DepartmentList";
import DepartmentForm from "../components/Department/DepartmentForm";

/**
 * DepartmentPage — Gestiona rutas internas:
 * /departments, /departments/add, /departments/edit/:id
 */
const DepartmentPage = () => {
    return (
        <Routes>
            <Route index element={<DepartmentList />} />
            <Route path="add" element={<DepartmentForm />} />
            <Route path="edit/:id" element={<DepartmentForm />} />
        </Routes>
    );
};

export default DepartmentPage;
