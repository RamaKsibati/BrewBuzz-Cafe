import axios from 'axios';


// Create a reusable Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL, 
  

});

export default axiosInstance;