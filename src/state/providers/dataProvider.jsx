import { useState } from "react";
import { DataContext } from "../contexts/dataContext";
import PropTypes from "prop-types";

export function DataProvider({ children }) {
    const [data, setData] = useState([
        {
            name: "Google",
            website: "https://www.google.com",
            totpSecret: "JQGRGWQTITHOJMGR",
        },
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
