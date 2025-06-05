import axios from "axios"

const loanService = {
    loanList: async (email) => {
        return await axios.get(
            `${import.meta.env.VITE_NODE_SERVER_URL}/loans/${email}`
        )
    },
    addLoan: async (dateSubmitted, firstName, lastName, amount, type, loanStatus, department, loanManager, loanOfficer, loanProcessor, loanUnderwriter, tasks, estClosingDate, closingDate, notes) => {
        return await axios.post(
            `${import.meta.env.VITE_NODE_SERVER_URL}/loans/addLoan`,
            {dateSubmitted, firstName, lastName, amount, type, loanStatus, department, loanManager, loanOfficer, loanProcessor, loanUnderwriter, tasks, estClosingDate, closingDate, notes},
            { headers: { "Content-Type": "application/json" } }
        )
    },
    updateLoan: async (id, loan) => {
        console.log("id, loan", id, loan)
        return await axios.put(
            `${import.meta.env.VITE_NODE_SERVER_URL}/loans/${id}`,
            loan,
            { headers: { "Content-Type": "application/json" } }
        )
    },
    getLoan: async (id) => {
        return await axios.get(
            `${import.meta.env.VITE_NODE_SERVER_URL}/loans/detail/${id}`,
            { headers: { "Content-Type": "application/json" } }
        )
    },

    
 

}

export default loanService