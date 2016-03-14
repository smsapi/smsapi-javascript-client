var ActionAbstract = require('./action-abstract.js');

/**
 *
 * @param options
 * @extends ActionAbstract
 * @constructor
 */
function SenderAdd(options) {
    ActionAbstract.call(this, options);
}

SenderAdd.prototype = Object.create(ActionAbstract.prototype);

/**
 * @param  {String} [name]
 * @return {SenderAdd|String}
 */
SenderAdd.prototype.name = function (name) {
    return this.param('add', name);
};

/**
 * @return {Promise}
 */
SenderAdd.prototype.execute = function () {
    return this.request()
        .path('sender.do')
        .data(this.params())
        .json()
        .execute();
};

module.exports = SenderAdd;
