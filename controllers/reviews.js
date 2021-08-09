const Review = require('../models/reviews.js');
const CustomerService = require('../services/Customer');
const ReviewService = require('../services/Review');
const { body, validationResult } = require('express-validator');

async function getAllReviews(req, res) {
    const { productId } = req.params;
    const reviews = await Review.aggregate([
        { $match: { productId } },
        {
            $lookup: {
                from: "customers",
                localField: "email",
                foreignField: "email",
                as: 'customer'
            }
        },
    ]).exec();

    const data = reviews.map((review) => {
        const { title, summary, rating, isRecommend, created_at, nickname } = review;

        return {
            title,
            summary,
            rating,
            isRecommend,
            nickname,
            created_at
        };
    });

    res.status(200).json({
        status: 'ok',
        data,
    });
}

async function addReview(req, res) {
    const { productId } = req.params;

    const result = validationResult(req);
    if (!result.isEmpty()) {
        // Response will contain something like
        // { errors: [ "body[password]: must be at least 10 chars long" ] }
        return res.json({ errors: result.array() });
    }

    const {
        title,
        summary,
        rating,
        isRecommend,
        email,
        nickname
    } = req.body;

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
        nickname,
        email: customer.email
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

var reviewValidate = [
    body('email').isEmail().normalizeEmail(),
    body('title').not().isEmpty().trim().escape(),
    body('summary').not().isEmpty().trim().escape(),
    body('rating').isInt({ min: 1, max: 5 }),
    body('nickname').not().isEmpty().trim().escape(),
    body('isRecommend').isBoolean(),
];

module.exports = {
    getAllReviews: getAllReviews,
    addReview: addReview,
    reviewValidate: reviewValidate,
}