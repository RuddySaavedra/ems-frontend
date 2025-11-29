import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";
import { Users, Briefcase, Award, UserPlus } from "lucide-react";

/**
 * 🏠 Home Page (Dashboard)
 * -----------------------------------------------------
 * ✔ Muestra saludo personalizado según usuario autenticado
 * ✔ Carga métricas globales (empleados, departamentos, skills, dependientes)
 * ✔ Renderiza gráfico de empleados por departamento
 * ✔ Soporta respuesta paginada del backend
 */
export default function Home() {
    const { user, loading } = useAuth();

    const [stats, setStats] = useState({
        employees: 0,
        departments: 0,
        skills: 0,
        dependents: 0,
    });
    const [chartData, setChartData] = useState([]);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        if (!loading) {
            fetchStats();
        }
    }, [loading]);

    const fetchStats = async () => {
        try {
            const [empRes, depRes, skillRes, depdRes] = await Promise.all([
                api.get("/employees"),
                api.get("/departments"),
                api.get("/skills"),
                api.get("/dependents"),
            ]);

            // 🧠 Normalizar estructura de respuesta (paginada o lista)
            const departments = Array.isArray(depRes.data.data)
                ? depRes.data.data
                : depRes.data.content || depRes.data.departments || [];

            const employees = Array.isArray(empRes.data.data)
                ? empRes.data.data
                : empRes.data.content || [];

            const skills = Array.isArray(skillRes.data.data)
                ? skillRes.data.data
                : skillRes.data.content || [];

            const dependents = Array.isArray(depdRes.data.data)
                ? depdRes.data.data
                : depdRes.data.content || [];

            // ✅ Contadores globales
            setStats({
                employees: employees.length || 0,
                departments: departments.length || 0,
                skills: skills.length || 0,
                dependents: dependents.length || 0,
            });

            // ✅ Gráfico de empleados por departamento
            const departmentStats = departments.map((dept) => ({
                name: dept.name || dept.department_name || "N/A",
                employees: employees.filter(
                    (emp) =>
                        emp.departmentName === dept.name ||
                        emp.department_name === dept.name
                ).length,
            }));


            setChartData(departmentStats);
        } catch (error) {
            console.error("❌ Error al cargar datos:", error);
        } finally {
            setFetching(false);
        }
    };

    // ⏳ Pantalla mientras se carga usuario o datos
    if (loading || fetching) {
        return (
            <div className="flex flex-col items-center justify-center h-[80vh] text-gray-600">
                <svg
                    className="animate-spin h-10 w-10 text-blue-500 mb-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                </svg>
                <p className="text-lg font-medium">Cargando tu panel...</p>
            </div>
        );
    }

    // 🧠 Normalizar nombre y rol
    const displayName = `${user?.firstname || ""} ${user?.lastname || ""}`.trim();
    const roleName =
        user?.role === "ROLE_ADMIN"
            ? "Administrador"
            : user?.role === "ROLE_USER"
                ? "Usuario"
                : user?.role || "Invitado";

    const cards = [
        {
            title: "Employees",
            value: stats.employees,
            icon: <Users className="text-blue-600" size={28} />,
            color: "bg-blue-50",
        },
        {
            title: "Departments",
            value: stats.departments,
            icon: <Briefcase className="text-green-600" size={28} />,
            color: "bg-green-50",
        },
        {
            title: "Skills",
            value: stats.skills,
            icon: <Award className="text-yellow-600" size={28} />,
            color: "bg-yellow-50",
        },
        /*{
            title: "Dependents",
            value: stats.dependents,
            icon: <UserPlus className="text-purple-600" size={28} />,
            color: "bg-purple-50",
        },*/
    ];

    return (
        <div className="space-y-6">
            {/* 🔹 SALUDO */}
            <div className="bg-white rounded-xl shadow p-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        ❤️ Bienvenido, {displayName || "Usuario"}
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Rol:{" "}
                        <span className="font-medium text-blue-600">{roleName}</span>
                    </p>
                </div>
            </div>

            {/* 🔹 TARJETAS DE MÉTRICAS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                {cards.map((card) => (
                    <div
                        key={card.title}
                        className={`flex items-center justify-between p-5 rounded-xl shadow ${card.color}`}
                    >
                        <div>
                            <h2 className="text-sm text-gray-500 font-medium">
                                {card.title}
                            </h2>
                            <p className="text-2xl font-bold text-gray-800">
                                {card.value}
                            </p>
                        </div>
                        {card.icon}
                    </div>
                ))}
            </div>

            {/* 🔹 GRÁFICO DE EMPLEADOS POR DEPARTAMENTO */}
            <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Employees by Department
                </h2>
                {chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Bar dataKey="employees" fill="#2563eb" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <p className="text-gray-500 text-center">
                        No hay datos disponibles.
                    </p>
                )}
            </div>
        </div>
    );
}
