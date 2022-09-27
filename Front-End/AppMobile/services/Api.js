import axios from 'axios';

// api connection
const api = axios.create({
  baseURL: 'https://server-comunity-bikes.herokuapp.com/',
});

export default api;