import React, { useEffect, useState } from "react";
import style from "./tile.module.css";
import { IconContext } from "react-icons";
import { FaClipboard } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { TileIcon } from "./tile_icon.jsx";
import PropTypes from "prop-types";
import { TOTP } from "totp-generator";

export const Tile = ({ tile }) => {
    const [totp, setTotp] = useState(
        TOTP.generate(tile.totpSecret, {
            digits: 6,
            algorithm: "SHA-1",
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
                TOTP.generate(tile.totpSecret, {
                    digits: 6,
                    algorithm: "SHA-1",
                    period: 30,
                })
            );
        }, 1000);
    }, [tile.totpSecret]);

    console.log(totp);
    return (
        <div className={style.base}>
            <div className={style.icon}>
                <TileIcon website={tile.website} name={tile.name}></TileIcon>
            </div>
            <p className={style.title}>{tile.name}</p>
            <p className={style.website}>{tile.website}</p>
            <p className={style.totp}>{totp.otp}</p>
            <IconContext.Provider
                value={{
                    color: "whitesmoke",
                    size: "2em",
                    className: style.icons,
                }}
            >
                <div className={style.trailing}>
                    <FaClipboard />
                    <MdEdit />
                </div>
            </IconContext.Provider>
        </div>
    );
};

Tile.propTypes = {
    tile: PropTypes.shape({
        name: PropTypes.string.isRequired,
        website: PropTypes.string.isRequired,
        totpSecret: PropTypes.string.isRequired,
    }).isRequired,
};
