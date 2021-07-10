const Review = require('../models/reviews.js');
const CustomerService = require('../services/Customer');
const ReviewService = require('../services/Review');

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
        const { title, summary, rating, isRecommend, created_at } = review;
        const { nickname } = review.customer;

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

    const {
        title,
        summary,
        rating,
        isRecommend,
        email,
        nickname
    } = req.fields;

    const customer = await CustomerService.getOrCreateCustomer({ email, nickname });

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

module.exports = {
    getAllReviews: getAllReviews,
    addReview: addReview
}