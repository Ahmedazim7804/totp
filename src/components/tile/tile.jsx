import React, { useContext, useEffect, useState } from "react";
import style from "./tile.module.css";
import { IconContext } from "react-icons";
import { FaClipboard } from "react-icons/fa";
import { TileIcon } from "./tile_icon.jsx";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import { TOTP } from "totp-generator";
import { DialogContext } from "../../state/contexts/dialogContext.jsx";
import { IoMdRemove } from "react-icons/io";
import { DeleteDialogContext } from "../../state/contexts/deleteDialogContext.jsx";

export const Tile = ({ tile }) => {
    const dialogContext = useContext(DialogContext);
    const deleteDialogContext = useContext(DeleteDialogContext);

    const [totp, setTotp] = useState(
        TOTP.generate(tile.secret, {
            digits: tile.digits,
            algorithm: tile.algorithm,
            period: 30,
        })
    );

    useEffect(() => {
        setInterval(() => {
            const seconds = new Date().getSeconds();

            if (seconds % 30 != 0) {
                return;
            }

            setTotp(
                TOTP.generate(tile.secret, {
                    digits: 6,
                    algorithm: "SHA-1",
                    period: 30,
                })
            );
        }, 1000);
    }, [tile.secret]);

    async function copyToClipboard() {
        await navigator.clipboard.writeText(totp.otp);
        toast("🦄 Wow so easy!", {
            position: "top-right",
            autoClose: 1000,
            draggable: false,
            theme: "colored",
        });
    }

    function deleteEntry() {
        dialogContext.editEntryDialog(tile);
    }

    return (
        <div className={style.base}>
            <div
                onClick={() => {
                    deleteDialogContext.setDialogId(tile.id);
                    deleteDialogContext.setVisibility(true);
                }}
                className={style.deleteIcon}
            >
                <p>X</p>
            </div>
            <div className={style.icon}>
                <TileIcon website={tile.website} name={tile.name}></TileIcon>
            </div>
            <p className={style.title}>{tile.name}</p>
            <p className={style.website}>{tile.website}</p>
            <p className={style.totp}>{totp.otp}</p>
            <IconContext.Provider
                value={{
                    size: "2em",
                    className: style.icons,
                }}
            >
                <div className={style.trailing}>
                    <FaClipboard onClick={copyToClipboard} />
                </div>
            </IconContext.Provider>
        </div>
    );
};

Tile.propTypes = {
    tile: PropTypes.shape({
        name: PropTypes.string.isRequired,
        website: PropTypes.string.isRequired,
        secret: PropTypes.string.isRequired,
        digits: PropTypes.number.isRequired,
        algorithm: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
    }).isRequired,
};
