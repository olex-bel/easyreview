const express = require('express');
const app = express();
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');

var corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const reviewsRouter = require('./routers/reviews');

app.use(cors(corsOptions));
app.disable('x-powered-by');
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1/reviews', reviewsRouter);
app.use(
    mongoSanitize({
        replaceWith: '_',
    }),
);

module.exports = app;