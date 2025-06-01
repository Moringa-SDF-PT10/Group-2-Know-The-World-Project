import { NavLink } from "react-router"; 

function NavBar() {
  return (
    <nav className="navbar">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/favouriteCountries">Favourites</NavLink>
      <NavLink to="/travelList">Travel List</NavLink>
      <NavLink to="/register">Register</NavLink>
      <NavLink to="/login">Log In</NavLink>
    </nav>
  );
}

export default NavBar;