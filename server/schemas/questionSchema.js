import mongoose from "mongoose"

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  a: { type: String, required: true, default: "None" },
  b: { type: String, required: true, default: "None" },
  c: { type: String, required: true, default: "None" },
  d: { type: String, required: true, default: "None" },
  answer: { type: String, required: true },
})

const Question = mongoose.model("Question", questionSchema)

export default Question
