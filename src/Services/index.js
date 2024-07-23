import axios from "axios";
import { apiEndPoints } from "../Utils/apiEndPoints";


const apiUrl = process.env.REACT_APP_API_URL;

// const apiUrl = process.env.REACT_APP_API_URL_LIVE;

export const register = async (name, email, password) => {
    try {
        const response = await axios.post(apiUrl + apiEndPoints.REGISTER, { name, email, password });
        return response?.data;
    } catch (error) {
        throw new Error(error.message);
    }
}
export const registerGoogle = async (accessToken) => {
    try {
        const response = await axios.post(apiUrl + apiEndPoints.REGISTER, { googleAccessToken: accessToken });
        return response?.data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const login = async (email, password) => {
    console.log(apiUrl);
    try {
        const response = await axios.post(apiUrl + apiEndPoints.LOGIN, { email, password });
        return response?.data;
    } catch (error) {
        throw new Error(error.message);
    }
}
export const glogin = async (accessToken) => {
    try {
        const response = await axios.post(apiUrl + apiEndPoints.LOGIN, {googleAccessToken: accessToken});
        return response?.data;
    } catch (error) {
        throw new Error(error.message);
    }
}


export const addTodo = async (token, title, description) => {
    try {
        const response = await axios.post(apiUrl + apiEndPoints.ADD_TODO, { title, description }, {
            headers: {
                Authorization: `${token}`
            }   
        });
        return response?.data;
    }
    catch (error) {
        throw new Error(error.message);
    }
}

export const getTodos = async (token) => {
    try {
        const response = await axios.get(apiUrl + apiEndPoints.GET_TODOS, {
            headers: {
                Authorization: `${token}`
            }
        });
        return response?.data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const deleteTodo = async (token, id) => {
    try {
        const response = await axios.delete(apiUrl + apiEndPoints.DELETE + "/" + id, {
            headers: {
                Authorization: `${token}`
            }
        });
        return response?.data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const updateTodo = async (token, id, title, description) => {
    try {
        const response = await axios.put(apiUrl + apiEndPoints.EDIT + "/" + id, { title, description }, {
            headers: {
                Authorization: `${token}`
            }
        });
        return response?.data;
    } catch (error) {
        throw new Error(error.message);
    }
}
export const updateTodoDrag = async (token, id, title, description, status) => {
    try {
        const response = await axios.put(apiUrl + apiEndPoints.EDIT + "/" + id, { title, description, status}, {
            headers: {
                Authorization: `${token}`
            }
        });
        return response?.data;
    } catch (error) {
        throw new Error(error.message);
    }
}