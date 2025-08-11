import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("https://crispy-goggles-7v5wvxx9796qcr4r6-3001.app.github.dev/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("El registro falló");
                }
            })
            .then((data) => {
                // Registro exitoso, redirigir al login
                navigate("/login");
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("Ocurrió un error al registrarse.");
            });
    };

    return (
        <div className="container">
            <h2>Registro</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="emailInput" className="form-label">
                        Correo Electrónico
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="emailInput"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="passwordInput" className="form-label">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="passwordInput"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Registrarse
                </button>
            </form>
        </div>
    );
};

