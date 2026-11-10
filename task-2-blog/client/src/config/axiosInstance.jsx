import axios from "axios";
export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials:true
})
let store;
export const injectStore = reduxStore => store = reduxStore;

axiosInstance.interceptors.request.use(
    function (config) {
        const token = store.getState().auth.accessToken;
        console.log(token);
        config.headers.authorization = `Bearer ${token}`;
        return config
    },
    function (error) { 
        return Promise.reject(error);
    }
)