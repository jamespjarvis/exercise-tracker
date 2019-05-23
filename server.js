const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const cors = require('cors')

const mongoose = require('mongoose')
mongoose.connect(process.env.MLAB_URI)

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});




require('./app.js');

const User = mongoose.model('User');
const Exercise = mongoose.model('Exercise');

app.post('/api/exercise/new-user', (req, res, next) => {
  const user = new User({ name: req.body.username });
  user.save((err, data) => err ? next(err) : res.json(data));
})
app.post('/api/exercise/add', (req, res, next) => {
  if(!req.body.userId) return next({ message: 'valid userid required'})
  const ex = new Exercise(req.body)
  ex.save((err, data) => err ? next(err) : res.json(data));
  
})
// GET /api/exercise/log?{userId}[&from][&to][&limit]
app.get('/api/exercise/log')

// Not found middleware
app.use((err, req, res, next) => {
  if(err) return next(err);
  return next({status: 404, message: 'not found'})
})

// Error Handling middleware
app.use((err, req, res, next) => {
  let errCode, errMessage

  if (err.errors) {
    // mongoose validation error
    errCode = 400 // bad request
    const keys = Object.keys(err.errors)
    // report the first validation error
    errMessage = err.errors[keys[0]].message
  } else {
    // generic or custom error
    errCode = err.status || 500
    errMessage = err.message || 'Internal Server Error'
  }
  res.status(errCode).type('txt')
    .send(errMessage)
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})

