import { createContext, useState } from "react";

const LoginContext = createContext();

function LoginStatusProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    function logIn() {
        setIsLoggedIn(true);
    }

    function logOut() {
        setIsLoggedIn(false);
    }

    return (
        <LoginContext.Provider value={{ logIn, logOut, isLoggedIn }}>
            {children}
        </LoginContext.Provider>
    )
}

export { LoginContext, LoginStatusProvider };