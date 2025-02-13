import { useState, useEffect } from "react";
import data from "./countriesService/countries";
import { Linter } from "eslint";

const ShowCountry = ({ country }) => {
  const [countryObj, setCountryObj] = useState({});
  useEffect(() => {
    if (country) {
      data.getCountry(country.name.common).then((country) => {
        setCountryObj(country);
      });
    }
  }, [country]);
  console.log(countryObj);
  const languages = Object.values(countryObj.languages);
  return (
    <>
      <h2>{country.name.common}</h2>
      <div>capital {countryObj.capital}</div>
      <div>area {countryObj.area}</div>
      <h3>languages:</h3>
      {/* <ul>
        {languages.map((language) => (
          <li>language</li>
        ))}
      </ul> */}
    </>
  );
};

function App() {
  const [input, setInput] = useState("");
  const [countries, setCountries] = useState([]);

  const handleSearchChange = (event) => {
    setInput(event.target.value);
  };

  useEffect(() => {
    data.getAll().then((countries) => setCountries(countries));
  }, []);

  const countriesToShow = countries.filter((country) =>
    country.name.common.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <>
      <span>find countries</span>
      <input type="text" value={input} onChange={handleSearchChange} />

      {countriesToShow.length < 10 ? (
        <>
          {countriesToShow.length === 1 ? (
            <ShowCountry country={countriesToShow[0]} />
          ) : (
            // <div>{data.getCountry(countriesToShow[0].name.common)}</div>
            countriesToShow.map((country) => (
              <div key={country.name.official}>{country.name.common}</div>
            ))
          )}
        </>
      ) : (
        <>
          {input === "" ? (
            <div></div>
          ) : (
            <div>Too many matches, specify another filter</div>
          )}
        </>
      )}
    </>
  );
}

export default App;
