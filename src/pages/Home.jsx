import ContinentCard from "../components/ContinentCard";

function Home() {

    const continents = ["Africa", "Antarctica", "Asia", "Europe", "North America", "Oceania", "South America"];

    function displayContinents() {
        return (
            continents.map(singleContinent => {
                return <ContinentCard key={singleContinent} continent={singleContinent} />
            })
        )
    }

    return (
        <main className="home-main">
            <h1 className="home-heading">Know The World</h1>
            <p className="home-paragraph">Explore continents, uncover interesting facts and fuel your curiosity. Click on a continent to begin your journey</p>
            <section className="home-continent-container">
                {displayContinents()}
            </section>
        </main>
    )
}

export default Home;