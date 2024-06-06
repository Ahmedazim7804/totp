import React, { useContext, useEffect } from "react";
import style from "./tile_box.module.css";
import { Tile } from "../tile/tile.jsx";
import { DataContext } from "../../state/contexts/dataContext.jsx";

import PropTypes from "prop-types";
import { DeleteDialog } from "../deleteDialog/deleteDialog.jsx";
import { DeleteDialogProvider } from "../../state/providers/deleteDialogProvider.jsx";
import { Toaster } from "react-hot-toast";
import { Loading } from "../loading/loading.jsx";

export const TileBox = () => {
    const dataContext = useContext(DataContext);

    return (
        <div>
            <Toaster></Toaster>
            <DeleteDialogProvider>
                <div className={style.base}>
                    {dataContext.loading ? (
                        <Loading></Loading>
                    ) : (
                        <TileBoxContent
                            data={dataContext.totpData}
                        ></TileBoxContent>
                    )}
                    <DeleteDialog></DeleteDialog>
                </div>
            </DeleteDialogProvider>
        </div>
    );
};

function TileBoxContent({ data }) {
    return data.length !== 0 ? (
        data.map((tile) => {
            return <Tile key={tile.created_at} tile={tile} />;
        })
    ) : (
        <p className={style.noDataText}>So lonely here, try adding some data</p>
    );
}

TileBoxContent.propTypes = {
    data: PropTypes.array.isRequired,
};
