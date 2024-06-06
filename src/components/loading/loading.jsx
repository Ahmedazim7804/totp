import React from "react";
import style from "./loading.module.css";

export function Loading() {
    return (
        <div className={style.loading}>
            <p>Loading...</p>
            <div className={style.loader}></div>
        </div>
    );
}
