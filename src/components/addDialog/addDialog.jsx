import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import style from "./addDialog.module.css";
import { DialogContext } from "../../state/contexts/dialogContext";
import { IconContext } from "react-icons";
import { FaUser } from "react-icons/fa";
import { MdOutlineWeb } from "react-icons/md";
import { FaKey } from "react-icons/fa6";
import { CiCircleInfo } from "react-icons/ci";
import { DataContext } from "../../state/contexts/dataContext";

export function AddDialog() {
    const dialogContext = useContext(DialogContext);
    const dataContext = useContext(DataContext);

    const [name, setName] = useState("Twitter");
    const [website, setWebsite] = useState("https://twitter.com");
    const [secret, setSecret] = useState("215436");

    function addToDatabase() {
        if (name === "" || website === "" || secret === "") {
            return;
        }
        dataContext.addData({
            name: name,
            website: website,
            totpSecret: secret,
        });

        setName("");
        setWebsite("");
        setSecret("");

        dialogContext.toggleDialog();
    }

    return (
        <dialog open={dialogContext.visible}>
            <div
                className={style.overlay}
                onClick={(e) => {
                    e.stopPropagation();
                    if (e.target == e.currentTarget) {
                        dialogContext.toggleDialog();
                    }
                }}
            >
                <div className={style.base}>
                    <IconContext.Provider
                        value={{
                            color: "whitesmoke",
                            size: "1.5em",
                        }}
                    >
                        <FaUser />
                        <input
                            placeholder="Name"
                            id="inputName"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></input>
                        <MdOutlineWeb />
                        <input
                            placeholder="Website/App"
                            id="websiteInput"
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                        ></input>
                        <FaKey />
                        <input
                            placeholder="Secret"
                            value={secret}
                            type="password"
                            onChange={(e) => setSecret(e.target.value)}
                        ></input>

                        <CiCircleInfo />
                        <select className={style.algorithm}>
                            <option value="SHA-1">SHA-1</option>
                            <option value="SHA-256">SHA-256</option>
                            <option value="SHA-512">SHA-512</option>
                        </select>

                        <input type="number" className={style.digits}></input>

                        <button onClick={addToDatabase}>
                            <p>Save</p>
                        </button>
                    </IconContext.Provider>
                </div>
            </div>
        </dialog>
    );
}
