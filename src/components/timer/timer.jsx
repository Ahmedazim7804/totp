import style from "./timer.module.css";
import React, { useEffect, useState } from "react";

export function Timer() {
    const [width, setWidth] = useState(1);

    useEffect(() => {
        setInterval(() => {
            let seconds = new Date().getSeconds();

            if (seconds > 30) {
                seconds = seconds - 30;
            }

            seconds = 30 - seconds;

            if (seconds === 0) {
                seconds = 30;
            }

            setWidth(seconds / 30);
        }, 1000);
    }, []);

    return (
        <div
            className={style.base}
            style={{
                width: `calc(((100vw - 128px) * ${width}))`,
            }}
        ></div>
    );
}
