import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Reviews from "./Reviews";

function OneCountry() {
  const { singleCountry } = useParams();
  const [country, setCountry] = useState(null);
  const [error, setError] = useState("");
  const [showReviews, setShowReviews] = useState(false);
  const [allCountries, setAllCountries] = useState([]);

  // Normalizes names to compare
  const normalize = (str) =>
    str.toLowerCase().replace(/[\s'’,-]/g, "").replace(/&/g, "and");

  // Loads all countries once
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
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

  const handleAddToFavourites = () => {
    let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    if (!favourites.find((c) => c.name.common === country.name.common)) {
      favourites.push(country);
      localStorage.setItem("favourites", JSON.stringify(favourites));
      alert(`${country.name.common} added to favourites!`);
    } else {
      alert(`${country.name.common} is already in favourites.`);
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
    <div>
      <h1>{country.name.common}</h1>
      <img
        src={country.flags.png}
        alt={`${country.name.common} flag`}
        style={{ width: "150px" }}
      />
      <p><strong>Region:</strong> {country.region}</p>
      <p>🏛 <strong>Capital:</strong> {country.capital?.[0] || "N/A"}</p>
      <p>👥 <strong>Population:</strong> {country.population.toLocaleString()}</p>
      <p>💰 <strong>Currency:</strong> {currencies}</p>
      <p>🗣️ <strong>Languages:</strong> {languages}</p>
      <p>📐 <strong>Area:</strong> {area}</p>
      <p>🌐 <strong>Country Code:</strong> {countryCode}</p>
      <p>🕒 <strong>Timezones:</strong> {timezones}</p>
      <p>👤 <strong>Demonym:</strong> {demonym}</p>

      <button onClick={handleAddToFavourites}>❤️ Add to Favourites</button>

      <button onClick={toggleReviews}>
        {showReviews ? "Hide Reviews" : "Show Reviews"}
      </button>

      {showReviews && <Reviews countryName={country.name.common} />}
    </div>
  );
}

export default OneCountry;
