import React from "react";
import { Routes, Route } from "react-router-dom";
import EmployeeList from "../components/Employee/EmployeeList.jsx";
import EmployeeForm from "../components/Employee/EmployeeForm.jsx";

/**
 * DepartmentPage — Gestiona rutas internas:
 * /departments, /departments/add, /departments/edit/:id
 */
const EmployeePage = () => {
    return (
        <Routes>
            <Route index element={<EmployeeList />} />
            <Route path="add" element={<EmployeeForm />} />
            <Route path="edit/:id" element={<EmployeeForm />} />
        </Routes>
    );
};

export default EmployeePage;