const mongoose = require('mongoose');

const UrlSchema = mongoose.Schema({
    url: String
}, {
    timestamps: true
});

module.exports = mongoose.model('URL', UrlSchema);