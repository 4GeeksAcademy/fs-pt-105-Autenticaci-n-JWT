import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                    Inicio
                </Link>
                <div className="d-flex">
                    <button className="btn btn-danger" onClick={handleLogout}>
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </nav>
    );
};

