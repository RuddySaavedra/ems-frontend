import axios from "axios";
import Swal from "sweetalert2";

const api = axios.create({
    baseURL: "https://emsback-production.up.railway.app/api",
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Flag para evitar bucles infinitos
let isRefreshing = false;

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Si no hay respuesta o no es 401 -> error normal
        if (!error.response || error.response.status !== 401) {
            return Promise.reject(error);
        }

        // Evitar reintentar el mismo request más de una vez
        if (originalRequest._retry) {
            return Promise.reject(error);
        }
        originalRequest._retry = true;

        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
            // No hay refresh token -> cerrar sesión
            Swal.fire("Sesión expirada", "Por favor vuelve a iniciar sesión", "warning").then(
                () => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    localStorage.removeItem("refreshToken");
                    window.location.href = "/login";
                }
            );
            return Promise.reject(error);
        }

        // Intentar refrescar el token sólo una vez cada vez
        if (isRefreshing) {
            // ya estamos refrescando en otra petición
            return Promise.reject(error);
        }

        isRefreshing = true;
        try {
            const res = await axios.post(
                "https://emsback-production.up.railway.app/api/auth/refresh",
                { refreshToken }
            );

            const data = res.data;
            const newToken = data.token;
            const newRefreshToken = data.refreshToken || refreshToken;

            // Guardar nuevos tokens
            localStorage.setItem("token", newToken);
            localStorage.setItem("refreshToken", newRefreshToken);
            localStorage.setItem("user", JSON.stringify(data));

            api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

            isRefreshing = false;

            // Reintentar la petición original con el nuevo token
            return api(originalRequest);
        } catch (refreshError) {
            console.error("No se pudo refrescar el token:", refreshError);
            isRefreshing = false;

            Swal.fire("Sesión expirada", "Por favor vuelve a iniciar sesión", "warning").then(
                () => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    localStorage.removeItem("refreshToken");
                    window.location.href = "/login";
                }
            );

            return Promise.reject(refreshError);
        }
    }
);

export default api;
