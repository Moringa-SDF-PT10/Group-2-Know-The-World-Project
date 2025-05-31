// FATUMA WRITE YOUR CODE IN THIS PAGE
import { Link } from "react-router";
import { Outlet } from "react-router";

function OneCountry() {
    return (
        <>
            <h1>Details about 1 country</h1>
            <div>
                <i>(FATUMA WRITE YOUR CODE IN THIS PAGE)</i>
            </div>
            <Link to="/singleCountry/reviews">check reviews</Link>
            <Outlet />
        </>
    )
}

export default OneCountry;