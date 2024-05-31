import React, { useContext } from "react";
import style from "./navbar.module.css";
import { FaSearch } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { IconContext } from "react-icons";
import { DataContext } from "../../state/contexts/dataContext";

export const Navbar = () => {
    const dataContext = useContext(DataContext);

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
                        style: {
                            paddingLeft: "32px",
                        },
                    }}
                >
                    <MdLogout />
                </IconContext.Provider>
            </div>
        </div>
    );
};
