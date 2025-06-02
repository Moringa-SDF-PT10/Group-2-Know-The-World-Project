import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

function OneCountry() {
  const { continent, singleCountry } = useParams();
  const [country, setCountry] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!singleCountry) return;

    const countryName = singleCountry.replace(/-/g, " ");

    async function fetchCountry() {
      try {
        const res = await fetch(
          `https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}?fullText=true`
        );
        if (!res.ok) throw new Error("Country not found");
        const data = await res.json();
        setCountry(data[0]);
        setError("");
      } catch (err) {
        setError(err.message);
        setCountry(null);
      }
    }

    fetchCountry();
  }, [singleCountry]);

  if (error) return <p>{error}</p>;
  if (!country) return <p>Loading country data...</p>;

  // Extracts currencies: { USD: { name: "United States dollar", symbol: "$" } }
  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((cur) => `${cur.name} (${cur.symbol})`)
        .join(", ")
    : "N/A";

  // Extracts languages: { eng: "English", fra: "French" }
  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "N/A";

  // Area with formatting
  const area = country.area ? country.area.toLocaleString() + " km²" : "N/A";

  // Country code (cca2)
  const countryCode = country.cca2 || "N/A";

  // Timezones array joined by commas
  const timezones = country.timezones ? country.timezones.join(", ") : "N/A";

  // Demonym: nested under demonyms.eng.m (male form) or fallback
  const demonym =
    country.demonyms && country.demonyms.eng && country.demonyms.eng.m
      ? country.demonyms.eng.m
      : "N/A";

  return (
    <div>
      <h1>{country.name.common}</h1>
      <img
        src={country.flags.png}
        alt={`${country.name.common} flag`}
        style={{ width: "150px" }}
      />
      <p> <strong>Region:</strong> {country.region} </p>
      <p>🏛️<strong>Capital:</strong> {country.capital ? country.capital[0] : "N/A"} </p>
      <p>👥<strong>Population:</strong> {country.population.toLocaleString()}</p>
      <p>💰 <strong>Currency:</strong> {currencies}</p>
      <p>🗣️ <strong>Languages:</strong> {languages}</p>
      <p>📐 <strong>Area:</strong> {area}</p>
      <p>🌐 <strong>Country Code:</strong> {countryCode}</p>
      <p>🕒 <strong>Timezones:</strong> {timezones}</p>
      <p>👤 <strong>Demonym:</strong> {demonym}</p>
    </div>
  );
}

export default OneCountry;
