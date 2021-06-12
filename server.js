// Setup empty JS object to act as endpoint for all routes
// date, temp, content
projectData = {};


// Require Express to run server and routes
const express = require('express')

// Start up an instance of app
const app = express()

/* Middleware*/
const bodyParser = require('body-parser')
// Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Cors for cross origin allowance
const cors = require('cors')
app.use(cors())

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
app.get('/getLastEntry', (req, res) => {
  res.send(projectData)
})

app.post('/postNewEntry', (req, res) => {
  console.log(req.body)
  projectData.temp = req.body.temp
  projectData.date = req.body.date
  projectData.content = req.body.content
  res.json(projectData)
})

app.listen(8000, () => {
  console.log('server started')
})
