import { Link } from "react-router";

function CountryCard({ singleCountry, continent, countryFlag }) {
    const singleCountryNoSpace = singleCountry.replaceAll(" ", "");
    return (
        <Link to={`/${continent}/${singleCountryNoSpace}`} className="country-name-and-flag-link">
            <img src={countryFlag} alt={`${singleCountry} flag`} />
            <p>{singleCountry}</p>
        </Link>
    )
}

export default CountryCard;