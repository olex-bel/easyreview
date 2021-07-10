const Customer = require('../models/customers.js');

async function getCustomerByEmail(email) {
    let customer = null;

    try {
        customer = Customer.findOne({ email }).exec();
    } catch (e) {
    }

    return customer;
};

async function createCustomer({ email, nickname }) {
    const customer = new Customer();
    let newCustomer = null;

    customer.email = email;
    customer.isBlocked = false;
    customer.nickname = nickname;

    try {
        newCustomer = await customer.save();
    } catch (e) {
        console.log(e)
    }

    console.log(newCustomer)

    return newCustomer;
}

async function getOrCreateCustomer({ email, nickname }) {
    let customer = await getCustomerByEmail(email);

    if (!customer) {
        customer = await createCustomer({ email, nickname });
    }

    return customer;
}

module.exports = {
    getCustomerByEmail,
    createCustomer,
    getOrCreateCustomer,
};