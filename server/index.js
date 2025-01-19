require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./src/middlewares/error-middleware')
const router = require('./src/router/index')

const PORT = process.env.PORT || 4000
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: '*'
}))
app.use('/', router)

app.use(errorMiddleware)

const start = async () => {
    try {
        app.listen(PORT, () =>  console.log(`server started on PORT = ${PORT}`))
    }
    catch (e) {
        console.log(e)
    }
}

start()
