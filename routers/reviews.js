var express = require('express');
var router = express.Router();

const {
    getAllReviews,
    addReview,
    reviewValidate
} = require('../controllers/reviews')

router.get('/:productId', getAllReviews);
router.post('/:productId', reviewValidate, addReview)

module.exports = router;