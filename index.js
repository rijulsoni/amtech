const express = require('express')
const app = express()
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const authRouter = require('./routes/auth.router')
dotenv.config()
const PORT = process.env.PORT || 3002


app
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.set('views', './views')
app.use('/api/auth', authRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})