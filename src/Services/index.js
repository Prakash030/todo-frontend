// const apiUrl = process.env.REACT_APP_API_URL_LIVE;
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

export const register = async (name, email, password) => {
    try {
        const { data } = await axios.post(`${apiUrl}/register`, { name, email, password });
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const login = async (email, password) => {
    try {
        const { data } = await axios.post(`${apiUrl}/login`, { email, password });
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}

