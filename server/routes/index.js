import express from "express"
import Question from "../schemas/questionSchema.js"

const router = express.Router()

router.post("/questions", async (req, res) => {
  try {
    const questions = Array.isArray(req.body) ? req.body : [req.body]
    const insertedQuestions = []
    for (const question of questions) {
      const existingQuestion = await Question.findOne({
        question: question.question,
      })
      if (existingQuestion) {
        console.log(`Question already exists: ${question.question}`)
        continue
      }
      const newQuestion = new Question(question)
      const insertedQuestion = await newQuestion.save()
      insertedQuestions.push(insertedQuestion)
    }
    res.json({
      message: "Question(s) inserted successfully",
      questions: insertedQuestions,
    })
  } catch (error) {
    console.error("Error inserting question(s)", error)
    res
      .status(500)
      .json({ error: "An error occurred while inserting question(s)" })
  }
})

router.get("/questions", async (req, res) => {
  try {
    const questions = await Question.find()
    res.json(questions)
  } catch (error) {
    res.status(500).json({ error: "Failed to get questions" })
  }
})

router.get("/questions/random/:count", async (req, res) => {
  try {
    const count = parseInt(req.params.count)
    const totalQuestions = await Question.countDocuments()
    if (count > totalQuestions) {
      return res
        .status(400)
        .json({ error: "Not enough questions in the database" })
    }
    const randomQuestions = await Question.aggregate([
      { $sample: { size: count } },
    ])
    res.json(randomQuestions)
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ error: "An error occurred while getting random questions" })
  }
})

router.delete("/questions/:id", async (req, res) => {
  try {
    const questionId = req.params.id
    const deletedQuestion = await Question.findByIdAndRemove(questionId)

    if (!deletedQuestion) {
      res.status(404).json({ error: "Question not found" })
    } else {
      res.json({ message: "Question deleted successfully" })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Server error" })
  }
})

export default router
