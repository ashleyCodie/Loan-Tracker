import mongoose from "mongoose";

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  taskName: String,
  startDate: Date,
  completed: Date,
  assignedTo: String,
}, {
  toJSON: {
    transform: (doc, ret, options) => {
      ret.id = ret._id
      delete ret._id
      delete ret.__v
      return ret
    }
}});

export default taskSchema;