const express = require('express');
const colors = require('colors')
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 5000
const {errorHandler} = require('./middleware/errorMiddleware')
const connectdb = require('./config/db')


connectdb()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/api/goals', require('./routes/mealRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

// serve frontend
if (process.env.NODE_ENV === 'production')

app.use(errorHandler)


app.listen(PORT, () => {
    console.log(`Server on port: ${PORT}`)
})