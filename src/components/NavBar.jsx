import { NavLink } from "react-router";
import { useContext } from "react";
import { LoginContext } from "../context/LoginStatusProvider";

function NavBar() {
  const { isLoggedIn, logOut } = useContext(LoginContext);

  return (
    <nav className="navbar">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/favouriteCountries">Favourites</NavLink>
      <NavLink to="/travelList">Travel List</NavLink>
      <NavLink to="/register">Register</NavLink>
      <NavLink to="/login">Log In</NavLink>
      {/* hide or show the log out button depending on whether user has logged in or not */}
      {isLoggedIn ? <button onClick={logOut}>Log Out</button> : null}
    </nav>
  );
}

export default NavBar;