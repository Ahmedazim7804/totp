import React, { useContext } from "react";
import { IoMdAdd } from "react-icons/io";
import { IconContext } from "react-icons";
import style from "./fab.module.css";
import { DialogContext } from "../../state/contexts/dialogContext.jsx";

export const Fab = () => {
    const dialogContext = useContext(DialogContext);

    return (
        <IconContext.Provider
            value={{
                color: "white",
                className: style.fab,
                size: "3em",
            }}
        >
            <div onClick={dialogContext.toggleDialog}>
                <IoMdAdd />
            </div>
        </IconContext.Provider>
    );
};
