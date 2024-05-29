import axios, { AxiosInstance } from "axios";

export const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
    timeout: import.meta.env.TIME_OUT,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('accessTokenInternProject')}`
    }
});