const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/');

module.exports = mongoose.connection;