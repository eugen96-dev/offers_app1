const mongoose = require('mongoose');

var pageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'This field is required'
    },
    slug: {
        type: String,
        required: 'This field is required'
    },
    type: {
        type: String,
        required: 'This field is required'
    },
    pid1: {
        type: String,
        required: 'This field is required'
    },
    pid2: {
        type: String,
    },
    pid3: {
        type: String,
    },
    pid4: {
        type: String,
    },
    pid5: {
        type: String,
    },
    pid6: {
        type: String,
    },
    cbskin: {
        type: String,
        required: 'This field is required'
    },
    cbfid: {
        type: String,
        required: 'This field is required'
    },
    offer_id: {
        type: String,
        required: 'This field is required'
    },
});

mongoose.model('Page', pageSchema);