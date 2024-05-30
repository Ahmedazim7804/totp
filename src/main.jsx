import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/app";
import "./main.css";
import { AuthenticationPage } from "./pages/authentication_page";
import { AuthProvider } from "./state/providers/authProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            <AuthenticationPage></AuthenticationPage>
            {/* <App /> */}
        </AuthProvider>
    </React.StrictMode>
);
