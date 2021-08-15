const Review = require('../models/reviews.js');
const CustomerService = require('../services/Customer');
const ReviewService = require('../services/Review');
const { body, validationResult } = require('express-validator');
const config = require('../config.js');

async function getReviews(req, res) {
    const { productId } = req.params;
    const { page = 1, limit = config.DEFAULT_PAGE_SIZE } = req.query;
    let reviews = [];
    let pagination = {
        page,
        limit,
    };

    if (limit > config.MAX_PAGE_SIZE) {
        limit = config.MAX_PAGE_SIZE;
    }

    try {
        reviews = await ReviewService.getReviews({
            productId,
            page,
            limit,
        });

        res.status(200).json({
            status: 'ok',
            data: {
                reviews,
                pagination,
            },
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            status: 'error',
        });
    }
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

async function getReviewsSummary(req, res) {
    const { productId } = req.params;

    try {
        const summary = await ReviewService.getReviewsSummary({ productId });
        let data = {
            raitingAvg: -1,
            reviewsCount: 0,
        }

        if (summary) {
            data = {
                raitingAvg: Number(summary.raitingAvg.toFixed(2)),
                reviewsCount: summary.reviewsCount,
            };
        }

        res.json({
            status: 'ok',
            data,
        });

    } catch (e) {

        console.log(e);

        res.status(500).json({
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
    getReviewsSummary: getReviewsSummary,
    reviewValidate: reviewValidate,
}