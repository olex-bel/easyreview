const mongoose = require('mongoose');

var reviewSchema = mongoose.Schema({
    productId: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    nickname: {
        type: String,
        require: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    isRecommend: {
        type: Boolean,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
}, { collection: 'reviews' });

module.exports = mongoose.model('Reviews', reviewSchema);
