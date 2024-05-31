import React, { useContext } from "react";
import style from "./deleteDialog.module.css";
import PropTypes from "prop-types";
import { DataContext } from "../../state/contexts/dataContext";
import { DeleteDialogContext } from "../../state/contexts/deleteDialogContext";

export function DeleteDialog() {
    const dataContext = useContext(DataContext);
    const { visible, setVisibility, dialogId } =
        useContext(DeleteDialogContext);

    function cancelDialog(e) {
        e.stopPropagation();
        if (e.target == e.currentTarget) {
            setVisibility(false);
        }
    }

    return visible ? (
        <div className={style.overlay} onClick={cancelDialog}>
            <div className={style.base}>
                <p className={style.title}>Remove Entry?</p>
                <p className={style.content}>
                    Are you sure, you want to delete this task?
                </p>
                <div
                    style={{
                        display: "flex",
                        alignSelf: "flex-end",
                    }}
                >
                    <button
                        className={style.cancelButton}
                        onClick={cancelDialog}
                    >
                        Cancel
                    </button>
                    <button
                        className={style.deleteButton}
                        onClick={async () => {
                            setVisibility(false);
                            await dataContext.deleteEntry(dialogId);
                        }}
                    >
                        Yes, remove it
                    </button>
                </div>
            </div>
        </div>
    ) : (
        <></>
    );
}
