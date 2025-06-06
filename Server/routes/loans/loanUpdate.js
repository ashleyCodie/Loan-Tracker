import loanModel from "../../schemas/loanModel.js"


const loanUpdate = async (req, res) => {
    let {id} = req.params
    console.log(req.body)
    let {dateSubmitted, firstName, lastName, amount, type, loanStatus, department, loanManager, loanOfficer, loanProcessor, loanUnderwriter, tasks, estClosingDate, closingDate, notes} = req.body
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
            const loan = await loanModel.findByIdAndUpdate({ "_id": id }, {
                dateSubmitted, firstName, lastName, amount, type, loanStatus, department, loanManager, loanOfficer, loanProcessor, loanUnderwriter, tasks, estClosingDate, closingDate, notes
            })
            console.log("loan", loan)
            res.status(200).json({ "message": "Loan has been Updated.", loan: loan, success: true })
        }
        catch (err) {
            console.log(err)
            res.status(500).send(err)
          }
    }
}

export default loanUpdate