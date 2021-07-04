const express = require('express')
const app = express()
const formidableMiddleware = require('express-formidable');
const database = require('./database')
const cors = require('cors')

require('dotenv').config()

const port = process.env.APP_PORT
var corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

database.connect().then(() => {
    console.log('connected');
}, error => {
    console.log(error, 'error');
})

const reviewsRouter = require('./routers/reviews');

app.use(cors(corsOptions));
app.use(formidableMiddleware());
app.use('/api/v1/reviews', reviewsRouter)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})