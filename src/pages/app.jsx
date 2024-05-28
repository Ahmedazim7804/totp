import React from "react";
import { Navbar } from "../components/navbar/navbar.jsx";
import { TileBox } from "../components/tile_box/tile_box.jsx";
import { Fab } from "../components/fab/fab.jsx";
import { AddDialog } from "../components/addDialog/addDialog.jsx";
import { DialogProvider } from "../state/providers/dialogProvider.jsx";
import { DataProvider } from "../state/providers/dataProvider.jsx";
import { Timer } from "../components/timer/timer.jsx";

const App = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Timer></Timer>
            <DataProvider>
                <TileBox></TileBox>
                <DialogProvider>
                    <Fab></Fab>
                    <AddDialog></AddDialog>
                </DialogProvider>
            </DataProvider>
        </div>
    );
};

export default App;
