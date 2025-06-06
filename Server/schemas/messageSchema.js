import mongoose from "mongoose"


const Schema = mongoose.Schema

const messageSchema = new Schema({

    messageDate: {
        type: String,
        default: ""
      },
    messageSender: {
      type: String,
      default: ""
    },
    messageSubject: {
        type: String,
        default: ""
      },
    messageFor: {
      type: String,
      default: ""
    },
    messageBody: {
      type: String,
      default: ""
    },
    
  })

  export default messageSchema