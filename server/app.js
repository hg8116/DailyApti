import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import routes from "./routes/index.js"

dotenv.config()
const app = express()
app.use(express.json({ limit: "50mb" }))

const mongoURL = process.env.MONGO_URL
const dbName = "main"
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: dbName,
})
const database = mongoose.connection
database.on("error", console.error.bind(console, "connection error:"))
database.once("open", () => {
  console.log("Connected to database")
})

app.use("/api", routes)

app.get("/", (req, res) => {
  res.send("Hello World!")
})

const port = 3000
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
