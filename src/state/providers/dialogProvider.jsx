import { useRef, useState } from "react";
import PropTypes from "prop-types";
import { DialogContext } from "../contexts/dialogContext.jsx";
import { TotpEntry } from "../../model/totp_entry.jsx";
import { Algorithms } from "../../utils/enum.jsx";

export function DialogProvider({ children }) {
    const [visible, setVisible] = useState(false);

    function toggleDialog() {
        setVisible(!visible);
    }

    return (
        <DialogContext.Provider
            value={{
                visible,
                toggleDialog,
            }}
        >
            {children}
        </DialogContext.Provider>
    );
}

DialogProvider.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
};
