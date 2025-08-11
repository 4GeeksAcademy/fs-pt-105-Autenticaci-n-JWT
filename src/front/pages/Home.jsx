import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const Home = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Comprobar si existe un token al cargar el componente
        const token = sessionStorage.getItem("token");
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const renderContent = () => {
        if (isAuthenticated) {
            // Contenido para usuarios autenticados
            return (
                <div className="text-center mt-5">
                    <h1 className="display-4">¡Bienvenido de nuevo!</h1>
                    <p>Ya has iniciado sesión.</p>
                    <Link to="/private">
                        <button className="btn btn-info">Ir a mi menú privado</button>
                    </Link>
                </div>
            );
        } else {
            // Contenido para usuarios no autenticados
            return (
                <div className="text-center mt-5">
                    <h1 className="display-4">Bienvenido a la aplicación</h1>
                    <p>Por favor, regístrate o inicia sesión para continuar.</p>
                    <div className="d-flex justify-content-center gap-3 mt-4">
                        <Link to="/signup">
                            <button className="btn btn-primary">Regístrate aquí</button>
                        </Link>
                        <Link to="/login">
                            <button className="btn btn-success">Iniciar Sesión</button>
                        </Link>
                    </div>
                </div>
            );
        }
    };

    return (
        <div>
            {renderContent()}
        </div>
    );
};