import React, { useContext, useRef, useState } from "react";
import style from "./auth_box.module.css";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IconContext } from "react-icons";
import { supabase } from "../../services/supabase.jsx";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "../../state/contexts/authContext.jsx";

export function AuthBox() {
    const authContext = useContext(AuthContext);

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [haveAccount, setHaveAccount] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const errorMessage = useRef("");

    function handleSubmit(e) {
        e.preventDefault();

        if (haveAccount) {
            signIn(e);
        } else {
            signUp(e);
        }
    }

    async function signUp(e) {
        setHasError(false);
        setIsLoading((e) => true);

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) {
            setHasError((e) => true);
            errorMessage.current = error.message;
            return;
        } else {
            setHasError(false);
        }

        setIsLoading((e) => false);

        navigate("verify");
    }

    async function signIn() {
        setHasError(false);
        setIsLoading((e) => true);

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        setIsLoading((e) => false);

        if (error) {
            setHasError((e) => true);
            errorMessage.current = error.message;
            return;
        } else {
            setHasError(false);
        }

        authContext.setUserId(data.user.id);

        navigate("/app", {
            state: { userId: data.user.id },
        });
    }

    function getButtonText() {
        if (haveAccount) {
            if (isLoading) {
                return "Signing In...";
            }

            return "Sign In";
        } else {
            if (isLoading) {
                return "Signing Up...";
            }

            return "Sign Up";
        }
    }

    return (
        <div>
            <Routes>
                <Route
                    path="/"
                    element={
                        <AuthBoxInputs
                            email={email}
                            setEmail={setEmail}
                            password={password}
                            setPassword={setPassword}
                            haveAccount={haveAccount}
                            setHaveAccount={setHaveAccount}
                            hasError={hasError}
                            errorMessage={errorMessage}
                            handleSubmit={handleSubmit}
                            buttonText={getButtonText()}
                        ></AuthBoxInputs>
                    }
                ></Route>
                <Route
                    path="verify"
                    element={
                        <AuthBoxEmailVerifyContent></AuthBoxEmailVerifyContent>
                    }
                ></Route>
            </Routes>
        </div>
    );
}

function AuthBoxInputs({
    email,
    setEmail,
    password,
    setPassword,
    haveAccount,
    setHaveAccount,
    hasError,
    errorMessage,
    handleSubmit,
    buttonText,
}) {
    return (
        <div className={style.base}>
            <p className={style.title}>{haveAccount ? "Sign In" : "Sign Up"}</p>
            <p>
                {haveAccount
                    ? "Don't have an account? "
                    : "Already have an account? "}
                <a
                    onClick={() => setHaveAccount(!haveAccount)}
                    className={style.toggle}
                >
                    {haveAccount ? "Sign Up" : "Sign In"}
                </a>
            </p>
            {hasError ? (
                <p className={style.errorMessage}>{errorMessage.current}</p>
            ) : (
                <></>
            )}
            <hr className={style.solid}></hr>
            <IconContext.Provider
                value={{ color: "whitesmoke", size: "1.5em" }}
            >
                <form onSubmit={handleSubmit}>
                    <MdEmail />
                    <div className={style.field_holder}>
                        <input
                            type="text"
                            id="inputEmail"
                            className={style.inputEmail}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        ></input>
                        <label htmlFor="inputEmail">Email</label>
                    </div>

                    <RiLockPasswordFill />
                    <div className={style.field_holder}>
                        <input
                            type="password"
                            className={style.inputPassword}
                            id="inputPassword"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        ></input>
                        <label htmlFor="inputPassword">Password</label>
                    </div>

                    <input type="submit" value={buttonText}></input>
                </form>
            </IconContext.Provider>
        </div>
    );
}

function AuthBoxEmailVerifyContent() {
    return (
        <div className={style.verifyBase}>
            <div className={style.emailBanner}>
                <IconContext.Provider
                    value={{ color: "whitesmoke", size: "4em" }}
                >
                    <MdEmail />
                </IconContext.Provider>
                <p>Check Your Mailbox</p>
            </div>
            <p>We have sent you a link yo verify your email.</p>
            <p>
                Check your spam folder if you do not hear from us after a while
            </p>
            <button>I Have Verified Email</button>
        </div>
    );
}

AuthBoxInputs.propTypes = {
    email: PropTypes.string.isRequired,
    setEmail: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    setPassword: PropTypes.func.isRequired,
    haveAccount: PropTypes.bool.isRequired,
    setHaveAccount: PropTypes.func.isRequired,
    hasError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    buttonText: PropTypes.string.isRequired,
};
