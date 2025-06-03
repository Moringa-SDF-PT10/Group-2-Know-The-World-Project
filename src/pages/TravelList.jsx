import { useContext, useEffect, useState } from "react";
import earthGlobe from "../Assets/earthGlobe.png";
import { useNavigate } from "react-router";
import { LoginContext } from "../context/LoginStatusProvider";

const TravelList = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [travelled, setTravelled] = useState([]);
  const [traveling, setTraveling] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Protecting page by ensuring user has logged in
  const { isLoggedIn } = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      alert("Login in required")
    }
  }, [isLoggedIn])

  const [expanded, setExpanded] = useState({
    all: true,
    traveling: true,
    travelled: true,
    wishlist: true,
  });


  useEffect(() => {
    const fetchCountries = async () => {
      const res = await fetch("https://restcountries.com/v3.1/all?fields=name");
      const data = await res.json();
      const sorted = data.sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
      );
      setCountries(sorted);
    };
    fetchCountries();
  }, []);

  const toggleSection = (key) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filterCountries = (list) =>
    list.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const addToList = (country, setList) => {
    setList((prev) =>
      prev.find((c) => c.name.common === country.name.common)
        ? prev
        : [...prev, country]
    );
  };

  const [dropdownOpenId, setDropdownOpenId] = useState(null);

  const editCountry = (country, list, setList) => {
    const newName = prompt("Edit country name:", country.name.common);
    if (newName) {
      setList(
        list.map((c) =>
          c.name.common === country.name.common
            ? { ...c, name: { ...c.name, common: newName } }
            : c
        )
      );
    }
  };


  const removeFromList = (country, setList) => {
    setList((prev) =>
      prev.filter((c) => c.name.common !== country.name.common)
    );
  };

  const Section = ({ title, keyName, data, setData, showAdd, className }) => (
    <div className={`dropdown-section ${className || ''}`}>
      <button className="section-toggle" onClick={() => toggleSection(keyName)}>
        {expanded[keyName] ? "▾" : "▸"} {title}
      </button>
      {expanded[keyName] && (
        <ul className="dropdown-list">
          {filterCountries(data).map((country) => (
            <li key={country.name.common} className="dropdown-item">
              <span>{country.name.common}</span>
              <div className="buttons">
                {showAdd ? (
                  <>
                    <button id="but" title="Add to Currently Traveling" onClick={() => addToList(country, setTraveling)}>Travelling</button>
                    <button id="but" title="Add to Travelled" onClick={() => addToList(country, setTravelled)}> Travelled</button>
                    <button id="but" title="Add to Wishlist" onClick={() => addToList(country, setWishlist)}> To Travel </button>
                  </>
                ) : (
                  <>
                    <div className="dropdown-wrapper">
                      <button
                        className="edit-category"
                        onClick={() => setDropdownOpenId(dropdownOpenId === country.name.common ? null : country.name.common)} title="Move to another category" >
                        ✏️Edit Category </button>
                      <div>
                        {dropdownOpenId === country.name.common && (
                          <select onChange={(e) => {
                            const value = e.target.value;
                            if (!value) return;
                            let targetSet;
                            if (value === "traveling") targetSet = setTraveling;
                            else if (value === "travelled") targetSet = setTravelled;
                            else if (value === "wishlist") targetSet = setWishlist;
                            if (targetSet) {
                              targetSet((prev) => {
                                const exists = prev.find((c) => c.name.common === country.name.common);
                                if (exists) {
                                  alert("Already exists in this category.");
                                  return prev;
                                }
                                return [...prev, country];
                              });

                              // remove from current list
                              setData((prev) => prev.filter((c) => c.name.common !== country.name.common));
                              setDropdownOpenId(null);
                            }
                          }}
                          >
                            <option value="">Move to...</option>
                            <option value="traveling">Currently Traveling</option>
                            <option value="travelled">Travelled</option>
                            <option value="wishlist">Wishlist</option>
                          </select>
                        )}
                      </div>
                    </div>
                    <br></br>
                    <button
                      className="delete-btn"
                      onClick={() => removeFromList(country, setData)}>Delete 🗑️</button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div className="travel-page">
      <h2>
        <img src={earthGlobe} className="globe-image" alt="Globe" />
        My Travel List</h2>
      <input
        type="text"
        className="search-bar"
        placeholder=" Search countries..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="sections-row">
        <Section
          title="All Countries"
          keyName="all"
          data={countries}
          setData={setCountries}
          showAdd={true}
          className="main-section"
        />
        <Section
          title="Currently Traveling"
          keyName="traveling"
          data={traveling}
          setData={setTraveling}
          showAdd={false}
        />
        <Section
          title="Travelled"
          keyName="travelled"
          data={travelled}
          setData={setTravelled}
          showAdd={false}
        />
        <Section
          title="Planning to Travel"
          keyName="wishlist"
          data={wishlist}
          setData={setWishlist}
          showAdd={false}
        />
      </div>
    </div>
  );
};

export default TravelList;