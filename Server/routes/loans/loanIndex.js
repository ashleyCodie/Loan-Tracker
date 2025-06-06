import express from "express"
import loanCreate from "./loanCreate.js"
import loansGetAll from "./loansGetAll.js"
import loanUpdate from "./loanUpdate.js"
import loanGetOne from "./loanGetOne.js"

const loanIndex = express.Router()

loanIndex.post("/addLoan", loanCreate)
loanIndex.get("/:email", loansGetAll)
loanIndex.put("/:id", loanUpdate)
loanIndex.get("/detail/:id", loanGetOne)


export default loanIndex