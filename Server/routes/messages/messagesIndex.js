import express from "express"
import messageCreate from "./messageCreate.js"
import messagesGetAll from "./messagesGetAll.js"
import messageGetOne from "./messageGetOne.js"
import messageDelete from "./messageDelete.js"



const messageIndex = express.Router()

messageIndex.post("/", messageCreate)
messageIndex.get("/:email", messagesGetAll)
messageIndex.get("/detail/:id", messageGetOne)
messageIndex.delete("/:id", messageDelete)


export default messageIndex