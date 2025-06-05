import axios from "axios"

const authService = {
    authLogin: async (email, password) => {
        return await axios.post(
            `${import.meta.env.VITE_NODE_SERVER_URL}/users/login`,
            { email, password }
        )
    },
    checkLogin: async (token) => {
        return await axios.get(
            `${import.meta.env.VITE_NODE_SERVER_URL}/users/me/${token}`
        )
    },
    logout: async (token) => {
        return await axios.get(
            `${import.meta.env.VITE_NODE_SERVER_URL}/users/logout/${token}`
        )
    },

}

export default authService