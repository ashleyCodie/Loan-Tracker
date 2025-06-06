import mongoose from "mongoose"
import taskSchema from "./taskSchema.js"

const Schema = mongoose.Schema

const loanSchema = new Schema({
  dateSubmitted: Date,
    firstName: {
      type: String,
      default: ""
    },
    lastName: {
      type: String,
      default: ""
    },
    amount: {
      type: Number,
      default: ""
    },
    type: {
      type: String,
      default: ""
    },
    loanStatus: {
      type: String,
      default: ""
    },
    department: {
      type: String,
      default: ""
    },
    loanManager: {firstName: String, lastName: String, email: String},
    loanOfficer: {firstName: String, lastName: String, email: String},
    loanProcessor: {firstName: String, lastName: String, email: String},
    loanUnderwriter: {firstName: String, lastName: String, email: String},
    tasks: [ taskSchema ],
    estClosingDate: Date,
    closingDate: Date, 
    notes: String

    
  })

  export default loanSchema