import React from "react";
import { Navbar } from "../components/navbar/navbar.jsx";
import { TileBox } from "../components/tile_box/tile_box.jsx";
import { Fab } from "../components/fab/fab.jsx";
import { AddDialog } from "../components/addDialog/addDialog.jsx";
import { DialogProvider } from "../state/providers/dialogProvider.jsx";
import { DataProvider } from "../state/providers/dataProvider.jsx";
import { Timer } from "../components/timer/timer.jsx";
import { ToastContainer, toast } from "react-toastify";

const App = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div
                style={{
                    position: "fixed",
                    width: "100%",
                    backgroundColor: "red",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                }}
            >
                <ToastContainer
                    style={{
                        backgroundColor: "green",
                    }}
                ></ToastContainer>
            </div>
            <Timer></Timer>
            <DataProvider>
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
