import mongoose from "mongoose"

import MessageModel from "../../schemas/messageModel.js";


const messageDelete = async (req, res) => {
  console.log(req.body)
  let { id } = req.params

  try {
    const Message =  await MessageModel.deleteOne({ "_id": id })
    res.status(200).json({ "message": "Success. Message deleted." })
  }
  catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}

export default messageDelete