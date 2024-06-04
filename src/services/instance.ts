import axios, { AxiosInstance } from "axios";
import encryptDecrypt from "function/encryptDecrypt";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
    timeout: import.meta.env.TIME_OUT,
});


// eslint-disable-next-line @typescript-eslint/no-explicit-any
axiosInstance.interceptors.request.use(async (config: any) => {
    config.headers.Authorization = `Bearer ${encryptDecrypt.decrypt(localStorage.getItem("accessTokenInternProject") as string)}`
    return config
})

export default axiosInstance