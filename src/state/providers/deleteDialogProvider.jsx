import { useRef, useState } from "react";
import PropTypes from "prop-types";
import { DeleteDialogContext } from "../contexts/deleteDialogContext.jsx";

export function DeleteDialogProvider({ children }) {
    const [visible, setVisible] = useState(false);
    const [dialogId, setDialogId] = useState(null);

    function setVisibility(value) {
        setVisible(value);
    }

    return (
        <DeleteDialogContext.Provider
            value={{
                visible,
                setVisibility,
                setDialogId,
                dialogId,
            }}
        >
            {children}
        </DeleteDialogContext.Provider>
    );
}

DeleteDialogProvider.propTypes = {
    // children: PropTypes.arrayOf(PropTypes.element).isRequired,
    children: PropTypes.element.isRequired,
};
