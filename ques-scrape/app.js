const axios = require("axios")
const cheerio = require("cheerio")
const fs = require("fs")

// Array to store the categories and links
const categories = []

// Function to scrape categories and links from the website
const scrapeCategories = async () => {
  try {
    const response = await axios.get(
      "https://www.indiabix.com/aptitude/questions-and-answers/"
    )
    const html = response.data
    const $ = cheerio.load(html)

    // Select the category elements using the appropriate CSS selector
    const categoryElements = $(".need-ul-filter a")

    // Loop through the category elements
    categoryElements.each((index, element) => {
      const category = $(element).text().trim()
      const link = $(element).attr("href")
      const categoryObject = { category, link }
      categories.push(categoryObject)
    })

    return categories
  } catch (error) {
    console.error("Scraping failed:", error)
    return null
  }
}

// // Usage
// scrapeCategories()
//   .then((categories) => {
//     // console.log("Scraped categories and links:", categories)
//     console.log("Scraped categories and links:")
//   })
//   .catch((error) => {
//     console.error("Error:", error)
//   })

// Function to scrape questions from the website
const scrapeQuestions = async () => {
  try {
    const questions = []
    for (let category = 0; category < categories.length; category++) {
      const catPage = await axios.get(`${categories[category].link}`)
      const catHtml = catPage.data
      const $ = cheerio.load(catHtml)

      const ulElement = $("ul.pagination")
      const secondLastLi = ulElement.find("li:nth-last-child(2)")
      const liText = secondLastLi.text().trim()
      // console.log(liText)
      // console.log(typeof liText)

      for (let pagenum = 1; pagenum <= liText; pagenum++) {
        const response = await axios.get(`${categories[category].link}`)
        const html = response.data
        const $ = cheerio.load(html)
        // const questionElements = $(".bix-td-qtxt")
        // questionElements.each((index, element) => {
        //   const question = $(element).text().trim()
        //   questions.push(question)
        // })

        const questionContainers = $(".bix-div-container")
        questionContainers.each((index, element) => {
          const questionContainer = $(element)
          const questionText = questionContainer
            .find(".bix-td-qtxt")
            .text()
            .trim()
          const optionA = questionContainer
            .find(".bix-opt-row")
            .eq(0)
            .text()
            .trim()
          const optionB = questionContainer
            .find(".bix-opt-row")
            .eq(1)
            .text()
            .trim()
          const optionC = questionContainer
            .find(".bix-opt-row")
            .eq(2)
            .text()
            .trim()
          const optionD = questionContainer
            .find(".bix-opt-row")
            .eq(3)
            .text()
            .trim()
          const answer = questionContainer
            .find(".bix-td-miscell .jq-hdnakq")
            .attr("value")
          const questionObject = {
            question: questionText,
            a: optionA,
            b: optionB,
            c: optionC,
            d: optionD,
            answer: answer,
          }
          questions.push(questionObject)
        })
      }
    }

    // console.log(html)

    // Select the question elements using the appropriate CSS selector
    // Loop through the question elements and extract the text
    return questions
  } catch (error) {
    console.error("Scraping failed:", error)
    return null
  }
}

// // Usage
// scrapeQuestions()
//   .then((questions) => {
//     console.log("Length:", questions.length)
//     console.log("Scraped questions:", questions)
//   })
//   .catch((error) => {
//     console.error("Error:", error)
//   })

scrapeCategories()
  .then((categories) => {
    scrapeQuestions()
      .then((questions) => {
        const jsonData = JSON.stringify(questions, null, 2)
        console.log("Length:", questions.length)
        console.log("Scraped questions:", questions)

        fs.writeFile("data.json", jsonData, "utf-8", (err) => {
          if (err) {
            console.error("Error writing JSON file:", err)
          } else {
            console.log("Data saved to data.json")
          }
        })
      })
      .catch((error) => {
        console.error("Error:", error)
      })
    console.log("Scraped categories and links:")
  })
  .catch((error) => {
    console.error("Error:", error)
  })
