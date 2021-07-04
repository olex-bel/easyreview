const mongoose = require('mongoose');

function connect() {
    const dbPath = process.env.DB_PATH;
    const options = { useNewUrlParser: true, useUnifiedTopology: true }

    return mongoose.connect(dbPath, options);
}

module.exports = {
    connect
}