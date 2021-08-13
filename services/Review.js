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
    const result = await Review.aggregate([
        { $match: { productId } },
        {
            $facet: {
                "items": [
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

    return result[0];
}

module.exports = {
    createReview,
    getReviews,
};
