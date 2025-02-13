import axios from "axios"

const allUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all';
const countryUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name/'

const getAll = () => {
    const request = axios.get(allUrl);
    return request.then(response => response.data);
}

const getCountry = (countryName) => {
    const request = axios.get(`${countryUrl}/${countryName}`);
    return request.then(response => response.data);
}

export default { getAll, getCountry }