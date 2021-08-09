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

module.exports = {
    createReview,
};
