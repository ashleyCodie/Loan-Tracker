import "dotenv/config"
import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import userIndex from "./routes/users/userIndex.js"
import loanIndex from "./routes/loans/loanIndex.js"
import messageIndex from "./routes/messages/messagesIndex.js"


const app = express()
app.use(express.json())
app.use(cors())
const port = 8000

app.get("/", (req, res) => {
    res.send( "Hello World" )
})

app.use("/users", userIndex)
app.use("/loans", loanIndex)
app.use("/messages", messageIndex)

app.all("*", (req, res) => {
    res.status(404).json({
        success: false,
        data: "404"
    })
})

try {
const mongoURL = process.env.MONGODB_URL || ""
  await mongoose.connect(mongoURL)
  console.log(`Connected to MongoDB at ${mongoURL}`)

  app.listen(port, () => {
      console.log(`Mortgage Loan Tracker listening on port ${port}`)
  })
} 
catch(err) {
    console.log(err)
}