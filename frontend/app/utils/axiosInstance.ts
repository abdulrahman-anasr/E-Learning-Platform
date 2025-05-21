import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL , // Use environment variable for base URL
  withCredentials: true, // Include cookies if needed
});

export default axiosInstance;