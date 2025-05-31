import { Link } from "react-router";

function Home() {
    return (
        <>
            <h1>This is Home. 7 Continents are displayed here</h1>
            <Link to="/continent">View country from 1 continent</Link>
        </>
    )
}

export default Home;