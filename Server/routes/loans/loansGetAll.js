
import LoanModel from "../../schemas/loanModel.js"


const loansGetAll = async (req, res) => {
const { email } = req.params
if (!email || email === "") {
  res.status(500).json ({"message": "User Info not valid"})
}
else {
  // const loans = await LoanModel.find({ "loanManager.email": email })
  const loans = await LoanModel.find({ $or: [ { "loanManager.email": email }, { "loanOfficer.email": email }, {"loanProcessor.email": email}, {"loanUnderwriter.email": email } ] })
  console.log("loans", loans)
  res.status(200).json({"success": true, "loans": loans})
}
}

export default loansGetAll