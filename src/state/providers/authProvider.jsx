import { useState } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../contexts/authContext";

export function AuthProvider({ children }) {
    const auth = useAuthProvider();

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

function useAuthProvider() {
    const [userId, setUserId] = useState();

    function signOut() {}

    return {
        signOut,
        setUserId,
        userId,
    };
}

AuthProvider.propTypes = {
    // children: PropTypes.arrayOf(PropTypes.element).isRequired,
    children: PropTypes.node.isRequired,
};
