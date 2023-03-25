import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://hospital-backend-dod6.onrender.com'
});

export default instance;