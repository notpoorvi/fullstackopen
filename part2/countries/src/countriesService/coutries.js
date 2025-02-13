import axios from "axios"

const allUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all';
const countryUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name/'
const apiKey = import.meta.env.VITE_SOME_KEY
const weatherUrl = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

const getAll = () => {
    const request = axios.get(allUrl);
    return request.then(response => response.data);
}

const getCountry = (countryName) => {
    const request = axios.get(`${countryUrl}/${countryName}`);
    return request.then(response => response.data);
}

const getWeather = (capital) => {
    const request = axios.get(weatherUrl(capital));
    return request.then(response => response.data).catch(error => 'failed with ' + error);
}

export default { getAll, getCountry, getWeather }