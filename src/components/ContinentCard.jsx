import { Link } from "react-router";
import Africa from "../Assets/Africa.png";
import Antarctica from "../Assets/Antarctica.png";
import Asia from "../Assets/Asia.png";
import Europe from "../Assets/Europe.png";
import NorthAmerica from "../Assets/NorthAmerica.png";
import Oceania from "../Assets/Oceania.png";
import SouthAmerica from "../Assets/SouthAmerica.png";

function ContinentCard({ continent }) {

    let continentImage;
    let continentURL = continent.replace(" ", "");

    switch (continent) {
        case "Africa":
            continentImage = Africa;
            break;
        case "Antarctica":
            continentImage = Antarctica;
            break;
        case "Asia":
            continentImage = Asia;
            break;
        case "Europe":
            continentImage = Europe;
            break;
        case "North America":
            continentImage = NorthAmerica;
            break;
        case "Oceania":
            continentImage = Oceania;
            break;
        case "South America":
            continentImage = SouthAmerica;
            break;
    }

    return (
        <>
            <Link to={`/${continentURL}`} className="home-link">
                <img src={continentImage} alt={continent} className="home-continent-image" />
                <button className="home-button">{continent}</button>
            </Link>
        </>
    );
};

export default ContinentCard;