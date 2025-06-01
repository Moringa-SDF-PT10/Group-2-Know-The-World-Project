import './App.css'
import NavBar from './components/NavBar'
import { Outlet } from 'react-router'
import { useEffect, useState } from "react";

function App() {

  const [allCountries, setAllCountries] = useState([]);

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/all?fields=name,currencies,capital,region,subregion,languages,landlocked,area,maps,population,car,timezones,continents,flags,coatOfArms,latlng,unMember,borders,capitalInfo`)
      .then(resp => resp.json())
      .then(allCountriesArray => setAllCountries(allCountriesArray))
      .catch(error => console.log("SERVER ERROR", error))
  }, [])

  return (
    <>
      <header>
        <NavBar></NavBar>
      </header>
      <Outlet context={allCountries} />
    </>
  )
}

export default App
