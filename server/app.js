import express from "express"
import axios from "axios"

const app = express()
const apiKey = "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"

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.get("/jokes", async (req, res) => {
  try {
    const response = await axios.get(`https://api.chucknorris.io/jokes/random`)
    const joke = response.data.value
    res.send(joke)
  } catch (error) {
    console.log(error)
    res.send(500).json({ error: "Failed to fetch joke" })
  }
})

const port = 3000
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
