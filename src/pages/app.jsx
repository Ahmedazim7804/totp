import React, { useEffect } from "react";
import { Navbar } from "../components/navbar/navbar.jsx";
import { TileBox } from "../components/tile_box/tile_box.jsx";
import { Fab } from "../components/fab/fab.jsx";
import { AddDialog } from "../components/addDialog/addDialog.jsx";
import { DialogProvider } from "../state/providers/dialogProvider.jsx";
import { DataProvider } from "../state/providers/dataProvider.jsx";
import { Timer } from "../components/timer/timer.jsx";
import PropTypes from "prop-types";
import { Navigate, useNavigate, useLocation } from "react-router-dom";

const App = () => {
    const location = useLocation();

    const userId = location.state.userId;

    if (location.state === undefined || location.state === null) {
        return <Navigate to="/auth"></Navigate>;
    } else if (
        location.state.userId === undefined ||
        location.state.userId == null
    ) {
        return <Navigate to="/auth"></Navigate>;
    }

    return (
        <div>
            <DataProvider>
                <Navbar></Navbar>
                <Timer></Timer>
                <DialogProvider>
                    <TileBox></TileBox>
                    <Fab></Fab>
                    <AddDialog></AddDialog>
                </DialogProvider>
            </DataProvider>
        </div>
    );
};

export default App;

App.propTypes = {
    userId: PropTypes.string,
};
