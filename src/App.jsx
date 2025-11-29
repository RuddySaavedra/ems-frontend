import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

import MainLayout from "./layouts/MainLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Home from "./pages/Home";
import DepartmentPage from "./pages/DepartmentPage";
import EmployeePage from "./pages/EmployeePage";
import SkillPage from "./pages/SkillPage";
import DependentPage from "./pages/DependentPage";
import EmployeeSkillPage from "./pages/EmployeeSkillPage";

import "./index.css";

/**
 * 🚀 App.jsx — Enrutador principal
 * -----------------------------------------------------
 * ✔ Define rutas públicas (login, register)
 * ✔ Protege el resto con ProtectedRoute
 * ✔ Evita parpadeo infinito al cargar sesión
 */
export default function App() {
    return (
        <ThemeProvider>
            <Router>
                <AuthProvider>
                    <Routes>
                        {/* 🔓 RUTAS PÚBLICAS */}
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />

                        {/* 🔒 RUTAS PROTEGIDAS */}
                        <Route
                            path="/"
                            element={
                                <ProtectedRoute>
                                    <MainLayout />
                                </ProtectedRoute>
                            }
                        >
                            <Route index element={<Home />} />
                            <Route path="departments/*" element={<DepartmentPage />} />
                            <Route path="employees/*" element={<EmployeePage />} />
                            <Route path="skills/*" element={<SkillPage />} />
                            <Route path="dependents/*" element={<DependentPage />} />
                            <Route path="employee-skills/*" element={<EmployeeSkillPage />} />
                        </Route>

                        {/* 🚦 Redirección general */}
                        <Route path="*" element={<Navigate to="/login" replace />} />
                    </Routes>
                </AuthProvider>
            </Router>
        </ThemeProvider>
    );
}
