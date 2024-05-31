import { useEffect } from "react";
import { AuthBox } from "../components/authBox/auth_box";
import { supabase } from "../services/supabase.jsx";
import { useNavigate } from "react-router-dom";

export function AuthenticationPage() {
    const navigate = useNavigate();

    useEffect(() => {
        async function checkUser() {
            const user = await supabase.auth.getUser();

            if (user.data != null && user.data.user.id) {
                navigate("/app");
            }
        }

        checkUser();
    }, [navigate]);

    return (
        <div>
            <AuthBox></AuthBox>
        </div>
    );
}
