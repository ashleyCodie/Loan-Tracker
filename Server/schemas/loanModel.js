import mongoose from "mongoose"
import loanSchema from "./loanSchema.js"

loanSchema.set("toJSON", {
  transform: (doc, ret, options) => {
    console.log(ret)
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    return ret
  }
})

const loanModel = mongoose.model("Loan", loanSchema)

export default loanModel