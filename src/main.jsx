import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/app";
import "./main.css";
import { AuthenticationPage } from "./pages/authentication_page";
import { AuthProvider } from "./state/providers/authProvider";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/auth" />} />
                    <Route path="/auth/*" element={<AuthenticationPage />} />
                    <Route path="/app" element={<App />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    </React.StrictMode>
);
