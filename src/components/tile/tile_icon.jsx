import PropTypes from "prop-types";
import style from "./tile_icon.module.css";
import urlJoin from "url-join";
import { useEffect, useState } from "react";

export function TileIcon({ website, name }) {
    const [letter, setLetter] = useState();
    const [iconUrl, setIconUrl] = useState();

    const [useLetter, setUseLetter] = useState(false);

    useEffect(() => {
        if (website !== "") {
            const fullUrl = urlJoin(website, "favicon.ico");
            setIconUrl(fullUrl);
        } else {
            setLetter(name[0]);
            setUseLetter(true);
        }
    }, [setLetter, setIconUrl, name, website]);

    return (
        <div>
            {useLetter ? (
                <p className={style.letter}>{letter}</p>
            ) : (
                <img src={iconUrl} className={style.letter}></img>
            )}
        </div>
    );
}

TileIcon.propTypes = {
    website: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};
