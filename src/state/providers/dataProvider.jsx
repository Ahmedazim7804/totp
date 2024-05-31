import { useState, useEffect, useContext, useRef } from "react";
import { DataContext } from "../contexts/dataContext";
import PropTypes from "prop-types";
import { Algorithms } from "../../utils/enum";
import { TotpEntry } from "../../model/totp_entry.jsx";
import { AuthContext } from "../contexts/authContext.jsx";
import { supabase } from "../../services/supabase.jsx";

export function DataProvider({ children }) {
    const authContext = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const backupData = useRef([]);
    const [totpData, setTotpData] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        if (!filter) {
            setTotpData(backupData.current);
            return;
        }

        setTotpData(
            backupData.current.filter((entry) => {
                if (entry.name.toLowerCase().includes(filter.toLowerCase())) {
                    return true;
                }

                if (
                    entry.website.toLowerCase().includes(filter.toLowerCase())
                ) {
                    return true;
                }

                return false;
            })
        );
    }, [filter]);

    useEffect(() => {
        getData();
    }, [authContext]);

    function signOut() {
        setTotpData([]);
        backupData.current = [];
        setFilter("");
    }

    async function getData() {
        const user = await supabase.auth.getUser();

        let { data, error } = await supabase
            .from("Data")
            .select("*")
            .eq("userId", user.data.user.id);

        if (data != null) {
            setTotpData(data);
            backupData.current = data;
        }

        setLoading(false);
    }

    async function addData(entry) {
        const { data, error } = await supabase
            .from("Data")
            .insert([
                {
                    name: entry.name,
                    website: entry.website,
                    secret: entry.totpSecret,
                    algorithm: entry.algorithm,
                    digits: entry.digits,
                },
            ])
            .select();

        if (error) {
            console.log(error);
            return;
        } else {
            getData();
        }
    }

    async function deleteEntry(id) {
        const { error } = await supabase.from("Data").delete().eq("id", id);

        setTotpData(totpData.filter((entry) => entry.id !== id));

        if (error) {
            console.log(error);
            return;
        } else {
            getData();
        }
    }

    return (
        <DataContext.Provider
            value={{
                totpData,
                loading,
                addData,
                deleteEntry,
                setFilter,
                signOut,
            }}
        >
            {children}
        </DataContext.Provider>
    );
}

DataProvider.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    // children: PropTypes.element.isRequired,
};
