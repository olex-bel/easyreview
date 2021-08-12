const Review = require('../models/reviews.js');
const CustomerService = require('../services/Customer');
const ReviewService = require('../services/Review');
const { body, validationResult } = require('express-validator');
const MAX_LIMIT = 10;

async function getReviews(req, res) {
    const { productId } = req.params;
    const { page = 1, limit = MAX_LIMIT } = req.query;
    console.log((page - 1) * limit)
    console.log(req.query)
    const reviews = await Review.aggregate([
        { $match: { productId } },
        {
            $facet: {
                "data": [
                    { $skip: (page - 1) * limit },
                    { $limit: limit * 1 },
                    { $project: { email: 0 } }
                ],
                "metadata": [
                    {
                        $group: {
                            _id: '$productId',
                            'raiting_avg': { $avg: '$raiting' },
                            'count': { $sum: 1 }
                        }
                    },
                    { $project: { _id: 0 } }
                ]
            }
        }
    ]).exec();

    res.status(200).json({
        status: 'ok',
        data: reviews,
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
    getReviews: getReviews,
    addReview: addReview,
    reviewValidate: reviewValidate,
}