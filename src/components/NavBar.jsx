import { NavLink } from "react-router";

function NavBar() {

    return (
        <nav>
            {/* all spans to be deleted by Edith */}
            <NavLink to="/">Home</NavLink>
            <span>  </span>
            <NavLink to="/favouriteCountries">Favourite</NavLink>
            <span>  </span>
            <NavLink to="/travelList">Travel List</NavLink>
            <span>  </span>
            <NavLink to="/register">Register</NavLink>
            <span>  </span>
            <NavLink to="login">Log In</NavLink>
        </nav>
    )
}

export default NavBar;