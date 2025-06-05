import axios from "axios"

const usersService = {
    usersList: async () => {
        return await axios.get(
            `${import.meta.env.VITE_NODE_SERVER_URL}/users`
        )
    }
}
    export default usersService