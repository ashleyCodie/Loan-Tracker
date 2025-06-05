import axios from "axios"

const messageService = {
    messageList: async (email) => {
        return await axios.get(
            `${import.meta.env.VITE_NODE_SERVER_URL}/messages/${email}`
        )
    },
    addMessage: async ( 
        messageDate,
        messageFor,
        messageSubject,
        messageSender,
        messageBody,) => {
        return await axios.post(
            `${import.meta.env.VITE_NODE_SERVER_URL}/messages`,
            { messageDate,
                messageFor,
                messageSubject,
                messageSender,
                messageBody},
            { headers: { "Content-Type": "application/json" } }
        )
    },
    getMessage: async (id) => {
        return await axios.get(
            `${import.meta.env.VITE_NODE_SERVER_URL}/messages/detail/${id}`,
            { headers: { "Content-Type": "application/json" } }
        )
    },

    deleteMessage: async (id) => {
        return await axios.delete(
            `${import.meta.env.VITE_NODE_SERVER_URL}/messages/${id}`,
            { headers: { "Content-Type": "application/json" } }
        )
    },
 

}

export default messageService