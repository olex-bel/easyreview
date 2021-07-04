const Review = require('../models/reviews.js');
const CustomerService = require('../services/Customer');
const ReviewService = require('../services/Review');

async function getAllReviews(req, res) {
    const { productId } = req.params
    const reviews = await Review.find({ productId }).exec()
    const {title, summary, rating, isRecommend, created_at}

    res.status(200).json({
        status: 'ok',
        data: reviews,
    })
}

async function addReview(req, res) {
    const { productId } = req.params;

    const {
        title,
        summary,
        rating,
        isRecommend,
        email
    } = req.fields;

    const customer = await CustomerService.getOrCreateCustomer({ email });

    if (!customer) {
        return res.status(500).json({
            status: 'error',
        });
    }

    if (customer.isBlocked) {
        return res.json({
            status: 'error',
            message: 'Your email has been banned from sending review. Please contact customer service.'
        });
    }

    const review = await ReviewService.createReview({
        productId,
        rating,
        title,
        summary,
        isRecommend,
        customerId: customer._id
    });

    if (review) {
        res.json({
            status: 'ok',
            id: review._id,
        });
    } else {
        return res.status(500).json({
            status: 'error',
        });
    }
}

module.exports = {
    getAllReviews: getAllReviews,
    addReview: addReview
}