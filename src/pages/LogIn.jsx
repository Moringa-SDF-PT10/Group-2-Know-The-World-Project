import { useState, useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { LoginContext } from "../context/LoginStatusProvider";
import { Navigate } from "react-router";

function LogIn() {
    const { users } = useContext(UserContext);
    const { logIn } = useContext(LoginContext);

    const [username, setusername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const [redirect, setRedirect] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();

        // Check if users array is empty
        if (users.length === 0) {
            setError("No users found. Please register first.");
            return;
        }

        // Find user by username
        const user = users.find((user) => user.username === username);

        if (!user) {
            return setError("User not found. Please try again or register.");
        }

        // Check if password matches
        if (user.password !== password) {
            return setError("Incorrect password. Please try again.");
        }

        // Login successful
        logIn();
        setRedirect(true);
        setError("");
        // onLoginSuccess(user);
        alert("Login successful!");
    };

    if (redirect) {
        return <Navigate to="/" />
    }

    return (
        <div className="registration-page">
            <div className="registration-container">
                <form
                    onSubmit={handleLogin} className="registration-form">
                    <h2 className="registration-heading">Log In</h2>
                    <input
                        placeholder="Username"
                        type="text"
                        value={username}
                        onChange={(e) => setusername(e.target.value.toLowerCase())}
                        className="registration-input"
                        required
                    />
                    <input
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="registration-input"
                        required
                    />
                    {error && <p className="login-error">{error}</p>}
                    <button
                        type="submit"
                        className="registration-button"
                    >Login</button>
                </form>
            </div>
            <div className="registration-image">
                <div className="image-content">
                    <h1>Know the World</h1>
                    <p>
                        Join our community of travelers and discover amazing facts about every country.
                        Save your favorite destinations and plan your next adventure with us.
                    </p>
                </div>
            </div>
        </div>
    );

}

export default LogIn;