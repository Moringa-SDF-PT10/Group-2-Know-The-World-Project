import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { LoginContext } from "../context/LoginStatusProvider";

function Favourite() {
    const [favourites, setFavourites] = useState([]);
    const [loading, setLoading] = useState(true);

    // Protecting page by ensuring user has logged in
    const { isLoggedIn } = useContext(LoginContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
            alert("Login in required")
        }
    }, [isLoggedIn])

    // Load favourites from localStorage
    useEffect(() => {
        const savedFavourites = JSON.parse(localStorage.getItem("favourites")) || [];
        setFavourites(savedFavourites);
        setLoading(false);
    }, []);

    const removeFromFavourites = (countryName) => {
        const updatedFavourites = favourites.filter(
            (country) => country.name.common !== countryName
        );
        setFavourites(updatedFavourites);
        localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
    };

    if (loading) return <p>Loading favourites...</p>;

    return (
        <div className="favourites-page">
            <h1 className="favourites-heading">Your Favourite Countries</h1>

            {favourites.length === 0 ? (
                <p className="no-favourites">No favourites yet. Add some from country pages!</p>
            ) : (
                <div className="favourites-grid">
                    {favourites.map((country) => (
                        <div key={country.name.common} className="favourite-card">
                            <Link to={`/country/${country.name.common}`} className="country-link">
                                <img
                                    src={country.flags.png}
                                    alt={country.name.common}
                                    className="favourite-flag"
                                />
                                <h3>{country.name.common}</h3>
                            </Link>
                            <button
                                onClick={() => removeFromFavourites(country.name.common)}
                                className="remove-btn"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Favourite;