
import MessageModel from "../../schemas/messageModel.js"


const messagesGetAll = async (req, res) => {
const { email } = req.params
if (!email || email === "") {
  res.status(500).json ({"message": "Message Info not valid"})
}
else {
  const messages = await MessageModel.find()
  
  console.log("messages hello", messages)
  res.status(200).json({"success": true, "messages": messages})
}
}

export default messagesGetAll