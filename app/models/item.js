// --------------------------------------------------------
// app/models/item.js
// Item Schema and Model
// --------------------------------------------------------
var mongoose    = require('mongoose');
var schema      = mongoose.Schema;

var itemSchema = new schema({
    name: String
});

// define item model
module.exports = mongoose.model('Item', itemSchema);