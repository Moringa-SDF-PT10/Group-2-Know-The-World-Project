import { createContext, useState, useEffect } from "react";

const UserContext = createContext();

function UserProvider({ children }) {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        setUsers(storedUsers);
    }, []);

    // Update localStorage whenever users change
    useEffect(() => {
        localStorage.setItem("users", JSON.stringify(users));
    }, [users]);

    return (
        <UserContext.Provider value={{ users, setUsers }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider };