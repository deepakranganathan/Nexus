// --------------------------------------------------------
// app/routes.js
// --------------------------------------------------------

var Item = require('./models/item');

module.exports = function(app) {

    // Backend routes
    // sample api route
    app.get('/api/items', function(req, res) {
        // use mongoose to get all items in the database
        Item.find(function(err, items) {
            if (err)
                res.send(err);
            res.json(items);
        });
    });

    // route to handle creating goes here (app.post)
    // route to handle delete goes here (app.delete)

    // Frontend routes
    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.sendfile('./public/views/index.html'); // load our public/index.html file
    });

};
