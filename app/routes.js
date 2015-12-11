// --------------------------------------------------------
// app/routes.js
// --------------------------------------------------------

var Item = require('./models/item');

module.exports = function(app) {

    // Backend routes
    app.get('/api/items', function(req, res) {
        // get all items in the database
        Item.find(function(err, items) {
            if (err)
                res.send(err);
            res.json(items);
        });
    });

    // TODO: app.post
    // TODO: app.delete

    // Frontend routes
    // Handle all angular requests
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });

};
