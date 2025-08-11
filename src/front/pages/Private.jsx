import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            // Si no hay token, redirigir al login
            navigate("/login");
        }
    }, [navigate]);

    return (
        <div className="container">
            <h2>¡Bienvenido a la página privada!</h2>
            <p>Solo los usuarios autenticados pueden ver este contenido.</p>
        </div>
    );
};
