const app = require("./app");
const database = require('./database');

require('dotenv').config();

const port = process.env.APP_PORT

database.connect().then(() => {
    console.log('connected');

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    });
}, error => {
    console.log(error, 'Database connection error.');
});
