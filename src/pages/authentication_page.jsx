import { Suspense, useEffect } from "react";
import { AuthBox } from "../components/authBox/auth_box";
import { supabase } from "../services/supabase.jsx";
import { Navigate, useNavigate } from "react-router-dom";
import { Loading } from "../components/loading/loading.jsx";

export function AuthenticationPage() {
    const jwt = JSON.parse(
        localStorage.getItem("sb-vgrzsfzbuyanxosheajd-auth-token")
    );

    if (jwt === null || jwt === undefined) {
        return <AuthBox></AuthBox>;
    }

    const currentTimeStamp = Math.floor(Date.now() / 1000);

    if (jwt.expires_at > currentTimeStamp) {
        return <Navigate to="/app" state={{ userId: jwt.user.id }}></Navigate>;
    }

    return <AuthBox></AuthBox>;
}
