import { useState, useEffect } from "react";
import data from "./countriesService/coutries.js";

const ShowCountry = ({ country }) => {
  const [countryObj, setCountryObj] = useState({});
  const [temp, setTemp] = useState(null);
  const [icon, setIcon] = useState("");
  const [wind, setWind] = useState("");
  const [languages, setLanguages] = useState([]);
  const [flag, setFlag] = useState("");
  useEffect(() => {
    if (country) {
      data.getCountry(country.name.common).then((countryData) => {
        setCountryObj(countryData);
        setLanguages(Object.values(countryData.languages));
        setFlag(countryData.flags.png);
      });
      data.getWeather(country.capital[0]).then((weather) => {
        setTemp(weather.main.temp);
        setIcon(weather.weather[0].icon);
        setWind(weather.wind.speed);
      });
    }
  }, [country]);
  return (
    <>
      <h1>{country.name.common}</h1>
      <div>capital {countryObj.capital}</div>
      <div>area {countryObj.area}</div>
      <h3>languages:</h3>
      <ul>
        {languages.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      {flag && <img src={flag}></img>}
      <h2>Weather in {country.capital}</h2>
      <div>temperature {temp} Celsius</div>
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
      <div>wind {wind} m/s</div>
    </>
  );
};

function App() {
  const [input, setInput] = useState("");
  const [countries, setCountries] = useState([]);
  const [showCountry, setShowCountry] = useState(null);

  const handleSearchChange = (event) => {
    setInput(event.target.value);
  };

  useEffect(() => {
    data.getAll().then((countries) => setCountries(countries));
  }, []);

  const countriesToShow = countries.filter((country) =>
    country.name.common.toLowerCase().includes(input.toLowerCase())
  );

  const handleShow = (country) => {
    setShowCountry(country);
    return;
    // return <ShowCountry country={country} />;
  };

  return (
    <>
      <span>find countries</span>
      <input type="text" value={input} onChange={handleSearchChange} />
      {input !== "" && countriesToShow.length > 10 && (
        <div>Too many matches, specify another filter</div>
      )}
      {countriesToShow.length === 1 && (
        <>
          <ShowCountry country={countriesToShow[0]} />
        </>
      )}
      {countriesToShow.length < 10 &&
        countriesToShow.length > 1 &&
        countriesToShow.map((country) => (
          <div key={country.ccn3}>
            <span>{country.name.common}</span>
            <button onClick={() => handleShow(country)}>show</button>
            {showCountry && showCountry.name.common === country.name.common && (
              <ShowCountry country={showCountry} />
            )}
          </div>
        ))}
    </>
  );
}

export default App;
