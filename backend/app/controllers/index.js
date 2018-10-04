const smoothiesController = require('./smoothiesController');
const componentsController = require('./componentsController');
const shoppingListsController = require('./shoppingListsController');

module.exports = function(app, db) {
    smoothiesController(app, db);
    componentsController(app, db);
    shoppingListsController(app, db);
}