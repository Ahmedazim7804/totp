import React, { useContext } from "react";
import style from "./navbar.module.css";
import { FaSearch } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { IconContext } from "react-icons";
import { DataContext } from "../../state/contexts/dataContext";
import { supabase } from "../../services/supabase.jsx";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
    const dataContext = useContext(DataContext);
    const navigate = useNavigate();

    async function signOut() {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Error logging out:", error.message);
            return;
        }

        dataContext.signOut();
        navigate("/auth");
    }

    return (
        <div className={style.navbar}>
            <p className={style.title}>TOTP</p>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <div className={style.search}>
                    <FaSearch />
                    <input
                        className={style.searchInput}
                        onChange={(e) => dataContext.setFilter(e.target.value)}
                    ></input>
                </div>
                <IconContext.Provider
                    value={{
                        color: "white",
                        size: "1.5em",
                    }}
                >
                    <div className={style.logout} onClick={signOut}>
                        <MdLogout />
                    </div>
                </IconContext.Provider>
            </div>
        </div>
    );
};
