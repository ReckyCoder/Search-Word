import axios from "axios";

export const Api = axios.create({
    baseURL: "/api",
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});