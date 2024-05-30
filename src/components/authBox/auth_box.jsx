import React, { useRef, useState } from "react";
import style from "./auth_box.module.css";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IconContext } from "react-icons";
import { supabase } from "../../services/supabase.jsx";

export function AuthBox() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [haveAccount, setHaveAccount] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState();
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
        } else {
            setHasError(false);
        }

        setIsLoading((e) => false);
    }

    async function signIn(email, password) {
        setHasError(false);
        setIsLoading((e) => true);

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            setHasError((e) => true);
            errorMessage.current = error.message;
        } else {
            setHasError(false);
        }

        setIsLoading((e) => false);
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

                    <input type="submit" value={getButtonText()}></input>
                </form>
            </IconContext.Provider>
        </div>
    );
}
