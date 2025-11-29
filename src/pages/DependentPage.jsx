import React from "react";
import { Routes, Route } from "react-router-dom";
import DependentList from "../components/Dependent/DependentList";
import DependentForm from "../components/Dependent/DependentForm";

/**
 * DependentPage — Gestiona rutas internas:
 * /dependents, /dependents/add, /dependents/edit/:id
 */
const DependentPage = () => {
    return (
        <Routes>
            <Route index element={<DependentList />} />
            <Route path="add" element={<DependentForm />} />
            <Route path="edit/:id" element={<DependentForm />} />
        </Routes>
    );
};

export default DependentPage;
