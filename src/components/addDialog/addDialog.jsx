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
import { IoMdTime } from "react-icons/io";
import { Algorithms } from "../../utils/enum";
import { TotpEntry } from "../../model/totp_entry";

export function AddDialog() {
    const dialogContext = useContext(DialogContext);
    const dataContext = useContext(DataContext);

    const [name, setName] = useState("");
    const [website, setWebsite] = useState("");
    const [secret, setSecret] = useState("");
    const [algo, setAlgo] = useState(Algorithms.SHA1);
    const [digits, setDigits] = useState(6);

    function addToDatabase(event) {
        event.preventDefault();

        if (name === "" || website === "" || secret === "") {
            return;
        }

        const entry = new TotpEntry(name, website, secret, algo, digits);

        dataContext.addData(entry);

        setName("");
        setWebsite("");
        setSecret("");
        setAlgo(Algorithms.SHA1);
        setDigits(6);

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
                <form className={style.base} onSubmit={addToDatabase}>
                    <p className={style.title}>Add new entry</p>
                    <IconContext.Provider
                        value={{
                            color: "whitesmoke",
                            size: "1.5em",
                        }}
                    >
                        <FaUser />
                        <div className={style.field_holder}>
                            <input
                                id="inputName"
                                value={name}
                                required
                                onChange={(e) => setName(e.target.value)}
                            ></input>
                            <label htmlFor="inputName">Name</label>
                        </div>

                        <MdOutlineWeb />
                        <div className={style.field_holder}>
                            <input
                                // placeholder="Website/App"
                                id="websiteInput"
                                required
                                value={website}
                                onChange={(e) => setWebsite(e.target.value)}
                            ></input>
                            <label htmlFor="websiteInput">Website</label>
                        </div>

                        <FaKey />
                        <div className={style.field_holder}>
                            <input
                                id="secretInput"
                                value={secret}
                                required
                                type="text"
                                onChange={(e) => setSecret(e.target.value)}
                            ></input>
                            <label htmlFor="secretInput">Secret</label>
                        </div>

                        <CiCircleInfo />
                        <div className={style.field_holder}>
                            <select
                                id="selectAlgorithm"
                                className={style.algorithm}
                                value={algo}
                                onChange={(e) => setAlgo(e.target.value)}
                                style={{
                                    width: "100%",
                                }}
                            >
                                <option value={Algorithms.SHA1}>
                                    {Algorithms.SHA1}
                                </option>
                                <option value={Algorithms.SHA256}>
                                    {Algorithms.SHA256}
                                </option>
                                <option value={Algorithms.SHA512}>
                                    {Algorithms.SHA512}
                                </option>
                            </select>
                            <label
                                id="selectAlgorithmLabel"
                                htmlFor="selectAlgorithm"
                                style={{
                                    top: "-10px",
                                    fontSize: "0.75em",
                                }}
                            >
                                Algorithm
                            </label>
                        </div>

                        <IoMdTime />
                        <div className={style.field_holder}>
                            <input
                                id="digitsInput"
                                type="number"
                                value={digits}
                                onChange={(e) => setDigits(e.target.value)}
                                className={style.digits}
                            ></input>
                            <label htmlFor="digitsInput">Digits</label>
                        </div>

                        <input type="submit" value="Save"></input>
                        {/* <button onClick={addToDatabase}>
                            <p>Save</p>
                        </button> */}
                    </IconContext.Provider>
                </form>
            </div>
        </dialog>
    );
}
