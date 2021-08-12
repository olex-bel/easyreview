const mongoose = require('mongoose');

var customerSchema = mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true,
    },
    isBlocked: {
        type: Boolean,
        require: true,
    }
}, { collection: 'customers' });

const Customer = mongoose.model('Customers', customerSchema);

Customer.getCustomerByEmail = function (email) {
    let customer = null;

    this.findOne({ email }).then((customer) => {
        customer = customer;
    });

    return customer;
};

module.exports = Customer;
