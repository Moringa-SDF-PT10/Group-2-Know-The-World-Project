import { useOutletContext, useParams } from "react-router"
import CountryCard from "../components/CountryCard";

function AllCountries() {
    const urlContinent = useParams();
    const allCountries = useOutletContext();
    let continent = urlContinent.continent;

    // Add space between North America and South America for easier filtering
    if (continent === "NorthAmerica" || continent === "SouthAmerica") {
        continent = continent.slice(0, 5) + " " + continent.slice(5);
    }

    const displayCountries = allCountries
        .filter(country => {
            if (country.continents.length > 1) {
                return country.region === continent
            } else {
                return country.continents[0] === continent
            }
        })
        // Creates a new array that has been sorted by country name in alphabetical order
        .toSorted((a, b) => a.name.common.localeCompare(b.name.common))
        .map(country => {
            console.log(country)
            return (
                <CountryCard key={country.name.common} singleCountry={country.name.common} continent={continent} countryFlag={country.flags.png} />
            )
        })

    console.log(displayCountries)
    // displayCountries

    return (
        <>
            <h1 className="country-heading">Countries in {continent}</h1>
            {/* ADD FLAGS FOR EACH COUNTRY */}
            <section className="country">
                {displayCountries}
            </section>
        </>
    )
}

export default AllCountries