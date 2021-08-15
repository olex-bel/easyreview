var express = require('express');
var router = express.Router();

const {
    getReviews,
    addReview,
    getReviewsSummary,
    reviewValidate
} = require('../controllers/reviews')

router.get('/:productId', getReviews);
router.get('/summary/:productId', getReviewsSummary);
router.post('/:productId', reviewValidate, addReview)

module.exports = router;