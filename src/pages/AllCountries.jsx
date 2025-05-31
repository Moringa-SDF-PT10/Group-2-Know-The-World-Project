import { Link } from "react-router"

function AllCountries() {
    return (
        <>
            <h1>Display All Countries Within the selected continent</h1>
            {/* ADD FLAGS FOR EACH COUNTRY */}
            <Link to="/singleCountry">One Country Details</Link>
        </>
    )
}

export default AllCountries