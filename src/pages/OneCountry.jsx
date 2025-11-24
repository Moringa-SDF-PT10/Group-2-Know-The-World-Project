import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Reviews from "./Reviews";
import { LoginContext } from "../context/LoginStatusProvider";

function OneCountry() {
    const { singleCountry } = useParams();
    const [country, setCountry] = useState(null);
    const [error, setError] = useState("");
    const [showReviews, setShowReviews] = useState(false);
    const [allCountries, setAllCountries] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);

    // Protecting page by ensuring user has logged in
    const { isLoggedIn } = useContext(LoginContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
            alert("Login in required")
        }
    }, [isLoggedIn])

    // Normalizes names to compare
    const normalize = (str) =>
        str.toLowerCase().replace(/[\s'’,-]/g, "").replace(/&/g, "and");

    // Loads all countries once
    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all?fields=region,name,capital,population,currency,language,area,countrycode,timezone,demonym")
            .then((res) => res.json())
            .then(setAllCountries)
            .catch((err) => setError("Failed to load country list"));
    }, []);

    // When route param changes, this resolves the country name
    useEffect(() => {
        if (!singleCountry || allCountries.length === 0) return;

        const match = allCountries.find((c) => {
            return normalize(c.name.common) === normalize(singleCountry);
        });

        if (!match) {
            setError("Country not found");
            return;
        }

        const countryName = match.name.common;

        fetch(
            `https://restcountries.com/v3.1/name/${encodeURIComponent(
                countryName
            )}?fullText=true`
        )
            .then((res) => {
                if (!res.ok) throw new Error("Country not found");
                return res.json();
            })
            .then((data) => {
                setCountry(data[0]);
                setError("");
            })
            .catch((err) => {
                setError(err.message);
                setCountry(null);
            });
    }, [singleCountry, allCountries]);

    useEffect(() => {
        if (country) {
            const favorites = JSON.parse(localStorage.getItem("favourites")) || [];
            setIsFavorite(favorites.some(fav => fav.name.common === country.name.common));
        }
    }, [country]);

    const handleAddToFavourites = () => {
        let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
        if (!isFavorite) {
            favourites.push(country);
            localStorage.setItem("favourites", JSON.stringify(favourites));
            setIsFavorite(true);
            alert(`${country.name.common} added to favourites!`);
        } else {
            const updatedFavorites = favourites.filter(fav => fav.name.common !== country.name.common);
            localStorage.setItem("favourites", JSON.stringify(updatedFavorites));
            setIsFavorite(false);
            alert(`${country.name.common} removed from favourites!`);
        }
    };

    const toggleReviews = () => setShowReviews((prev) => !prev);

    if (error) return <p>{error}</p>;
    if (!country) return <p>Loading country data...</p>;

    const currencies = country.currencies
        ? Object.values(country.currencies)
            .map((cur) => `${cur.name} (${cur.symbol})`)
            .join(", ")
        : "N/A";

    const languages = country.languages
        ? Object.values(country.languages).join(", ")
        : "N/A";

    const area = country.area ? country.area.toLocaleString() + " km²" : "N/A";
    const countryCode = country.cca2 || "N/A";
    const timezones = country.timezones ? country.timezones.join(", ") : "N/A";
    const demonym =
        country.demonyms?.eng?.m || "N/A";

    return (
        <div className="one-country-page">
            <div className="country-header">
                <h1>{country.name.common}</h1>
                <img
                    src={country.flags.png}
                    alt={`${country.name.common} flag`}
                    className="country-flag"
                />
                <div className="country-details">
                    {/* https://restcountries.com/v3.1/all?fields=name,capital,population,currency,language,area,countrycode,timezone,demonym */}
                    <p><strong>Region:</strong> {country.region}</p>
                    <p>🏛 <strong>Capital:</strong> {country.capital?.[0] || "N/A"}</p>
                    <p>👥 <strong>Population:</strong> {country.population.toLocaleString()}</p>
                    <p>💰 <strong>Currency:</strong> {currencies}</p>
                    <p>🗣️ <strong>Languages:</strong> {languages}</p>
                    <p>📐 <strong>Area:</strong> {area}</p>
                    <p>🌐 <strong>Country Code:</strong> {countryCode}</p>
                    <p>🕒 <strong>Timezones:</strong> {timezones}</p>
                    <p>👤 <strong>Demonym:</strong> {demonym}</p>
                </div>

                <div className="action-buttons">
                    <button
                        onClick={handleAddToFavourites}
                        className={`action-button favorite-button ${isFavorite ? 'added'
                            : ''}`}>
                        {isFavorite ? '❤️ Remove from Favorite' : '❤️ Add to Favorites'}
                    </button>

                    <button
                        onClick={toggleReviews}
                        className="action-button review-button"
                    >
                        {showReviews ? "Hide Reviews" : "Show Reviews"}
                    </button>
                </div>

                {showReviews && (
                    <div>
                        <Reviews countryName={country.name.common} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default OneCountry;
