const config = require('../config.json');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || config.connectionString, { useCreateIndex: true, useNewUrlParser: true, useFindAndModify:false });
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../routes/v1/users/user.model'),
    Product: require('../routes/v1/products/product.model')
};