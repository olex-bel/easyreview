const Review = require('../models/reviews.js');

async function createReview({ productId, rating, title, summary, isRecommend, customerId }) {
    const review = new Review();
    let newReview = null;

    review.productId = productId;
    review.rating = rating;
    review.title = title;
    review.summary = summary;
    review.isRecommend = isRecommend;
    review.customer_id = customerId;

    try {
        newReview = await review.save();
    } catch (e) {
        console.log(e)
    }

    console.log(newReview)

    return newReview;
}

module.exports = {
    createReview,
};
