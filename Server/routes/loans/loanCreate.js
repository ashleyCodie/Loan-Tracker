
import LoanModel from "../../schemas/loanModel.js"



const loanCreate = async (req, res) => {

    let { dateSubmitted, firstName, lastName, amount, type, loanStatus, department, loanManager, loanOfficer, loanProcessor, loanUnderwriter, tasks, estClosingDate, closingDate, notes } = req.body
    console.log(dateSubmitted, firstName, lastName, amount, type, loanStatus, department, loanManager, loanOfficer, loanProcessor, loanUnderwriter, tasks, estClosingDate, closingDate, notes)

    if (
        (!dateSubmitted) ||
        (!firstName) ||
        (!lastName) ||
        (!amount) || 
        (!type) ||
        (!loanStatus) ||
        (!department) ||
        (!estClosingDate) 
      

    ) {
        console.log("Error: Post parameters are not valid.")
        res.status(500).send("Error: Post parameters are not valid.")
    }
    else {
        try {
            const loan = await LoanModel.create({
                dateSubmitted, firstName, lastName, amount, type, loanStatus, department, loanManager, loanOfficer, loanProcessor, loanUnderwriter, tasks, estClosingDate, closingDate, notes
            })
            console.log("loan", loan)
            res.status(200).json({ "message": "Loan has been Created.", loan: loan, success: true })
        }
        catch (err) {
            console.log(err)
            res.status(500).send(err)
          }
    }
}

export default loanCreate