// --------------------------------------------------------
// server.js
// Includes and Setup
// --------------------------------------------------------
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

// Configure app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set the static files location /public/foo will be /foo for users
app.use(express.static(__dirname + '/public')); 

// Connect to MongoDB
var mongoose    = require('mongoose');
var db          = require('./app/config/db');
mongoose.connect(db.url);

var Item        = require('./app/models/item');

// Set our port to 8080
var port        = process.env.PORT || 8080;

// --------------------------------------------------------
// Routes
// --------------------------------------------------------
var router      = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// Test route (GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'Look at me!' });   
});

// Route: /api/items
// --------------------------------------------------------
router.route('/items')

// create an item (POST http://localhost:8080/api/items)
.post(function(req, res) {

    var postItem = new Item();
    postItem.name = req.body.name;

    // save the item and check for errors
    postItem.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Item created!' });
    });

})

// get all the items (GET http://localhost:8080/api/items)
.get(function(req, res) {
    Item.find(function(err, items) {
        if (err)
            res.send(err);

        res.json(items);
    });
});

// Routes that end in /items/:item_id
// --------------------------------------------------------
router.route('/items/:item_id')

// get the item with that id
.get(function(req, res) {
    Item.findById(req.params.item_id, function(err, item) {
        if (err)
            res.send(err);
        res.json(item);
    });
})

// update the item with this id
.put(function(req, res) {
    Item.findById(req.params.item_id, function(err, item) {

        if (err)
            res.send(err);

        item.name = req.body.name;
        item.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Item updated!' });
        });

    });
})

// delete the item with this id
.delete(function(req, res) {
    Item.remove({
        _id: req.params.item_id
    }, function(err, item) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });
    });
});


// Register routes
app.use('/api', router);

// --------------------------------------------------------
// Start the server
// --------------------------------------------------------
app.listen(port);
console.log("Server running on port " + port);