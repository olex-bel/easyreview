const Review = require('../models/reviews.js');

async function createReview({ productId, rating, title, summary, isRecommend, email, nickname }) {
    const review = new Review();
    let newReview = null;

    review.productId = productId;
    review.rating = rating;
    review.title = title;
    review.summary = summary;
    review.isRecommend = isRecommend;
    review.email = email;
    review.nickname = nickname;

    try {
        newReview = await review.save();
    } catch (e) {
        console.log(e)
    }

    return newReview;
}

async function getReviews({ productId, page, limit }) {
    const result = await Review.find({ productId }, { email: 0 })
        .skip((page - 1) * limit)
        .limit(limit * 1)
        .exec();

    return result;
}

async function getReviewsSummary({ productId }) {
    const summary = await Review.aggregate([
        { $match: { productId } },
        {
            $group: {
                _id: '$productId',
                'raitingAvg': { $avg: '$raiting' },
                'reviewsCount': { $sum: 1 }
            }
        },
        { $project: { _id: 0 } }
    ]).exec();

    return summary[0];
}

module.exports = {
    createReview,
    getReviews,
    getReviewsSummary,
};
