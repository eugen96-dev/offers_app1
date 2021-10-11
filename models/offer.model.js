const mongoose = require('mongoose');

var offerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'This field is required'
    },
    slug: {
        type: String,
        required: 'This field is required'
    },
    ga_tracking: {
        type: String,
        required: 'This field is required'
    },
    shop: {
        type: String,
        required: 'This field is required'
    },
    platform: {
        type: String,
        required: 'This field is required'
    },
    vendor: {
        type: String,
        required: 'This field is required'
    },
});

mongoose.model('Offer', offerSchema);