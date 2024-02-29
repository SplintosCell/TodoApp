const mongoose = require('mongoose');

const schema = mongoose.Schema({
    item: String,
    done: Boolean,
});

module.exports = mongoose.model("Todo", schema)