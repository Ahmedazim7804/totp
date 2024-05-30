import { useState } from "react";
import { DataContext } from "../contexts/dataContext";
import PropTypes from "prop-types";
import { Algorithms } from "../../utils/enum";
import { TotpEntry } from "../../model/totp_entry.jsx";

export function DataProvider({ children }) {
    const [data, setData] = useState([
        new TotpEntry(
            "Google",
            "https://www.google.com",
            "JQGRGWQTITHOJMGR",
            Algorithms.SHA1,
            6
        ),
    ]);

    function addData(totpData) {
        setData([...data, totpData]);
    }

    return (
        <DataContext.Provider
            value={{
                data,
                addData,
            }}
        >
            {children}
        </DataContext.Provider>
    );
}

DataProvider.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
};
