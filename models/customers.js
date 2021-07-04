const mongoose = require('mongoose');

var customerSchema = mongoose.Schema({
    email: {
        type: String,
        require: true,
    },
    nickname: {
        type: String,
        require: true,
    },
    isBlocked: {
        type: Boolean,
        require: true,
    }
});

const Customer = mongoose.model('customer', customerSchema);

Customer.getCustomerByEmail = function (email) {
    let customer = null;

    this.findOne({ email }).then((customer) => {
        customer = customer;
    });

    return customer;
};

module.exports = Customer;
