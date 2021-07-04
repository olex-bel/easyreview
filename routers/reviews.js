var express = require('express');
var router = express.Router();

const {
    getAllReviews,
    addReview
} = require('../controllers/reviews')

router.get('/:productId', getAllReviews);
router.post('/:productId', addReview)

module.exports = router;