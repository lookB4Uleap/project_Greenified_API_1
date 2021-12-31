require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')

mongoose.connect(
    process.env.DATABASE_URL, 
    { useNewUrlParser: true, useUnifiedTopology: true },
    (req, res) => {
        console.log('Database Found')
    }
)

const db = mongoose.connection
db.on('error', (err) => console.error(err))
db.once('open', () => console.log('Connected to database'))

app.use(cors())
app.use(express.json())

const postsRoute = require('./routes/posts')
app.use('/post', postsRoute)

app.listen(4001, () => {
    console.log('Server Started')
})