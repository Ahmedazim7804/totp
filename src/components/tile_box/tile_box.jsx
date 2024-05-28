import React, { useContext } from "react";
import style from "./tile_box.module.css";
import { Tile } from "../tile/tile.jsx";
import { DataContext } from "../../state/contexts/dataContext.jsx";

export const TileBox = () => {
    const dataContext = useContext(DataContext);

    return (
        <div className={style.base}>
            {dataContext.data.map((tile) => {
                return <Tile key={tile.name} tile={tile} />;
            })}
        </div>
    );
};
