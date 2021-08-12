var express = require('express');
var router = express.Router();

const {
    getReviews,
    addReview,
    reviewValidate
} = require('../controllers/reviews')

router.get('/:productId', getReviews);
router.post('/:productId', reviewValidate, addReview)

module.exports = router;