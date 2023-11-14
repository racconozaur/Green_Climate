import axios from 'axios'


const BASE_URL = 'http://localhost:3000';


const createAxiosInstance = (token) => {
    const instance = axios.create({
        baseURL: BASE_URL,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
    
      return instance;
}

export default createAxiosInstance