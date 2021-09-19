const Customer = require('../models/customers.js');

async function getCustomerByEmail(email) {
    let customer = null;

    try {
        customer = Customer.findOne({ email }).exec();
    } catch (e) {
    }

    return customer;
};

async function createCustomer({ email }) {
    const customer = new Customer();
    let newCustomer = null;

    customer.email = email;
    customer.isBlocked = false;

    try {
        newCustomer = await customer.save();
    } catch (e) {
        console.log(e)
    }

    return newCustomer;
}

async function getOrCreateCustomer({ email }) {
    let customer = await getCustomerByEmail(email);

    if (!customer) {
        customer = await createCustomer({ email });
    }

    return customer;
}

async function blockCustomer({ email }) {
    return await Customer.updateOne({ email }, { isBlocked: true });
}

module.exports = {
    getCustomerByEmail,
    createCustomer,
    getOrCreateCustomer,
    blockCustomer,
};