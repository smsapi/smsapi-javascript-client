var ActionAbstract = require('./action-abstract');

/**
 *
 * @param options
 * @param name
 * @extends ActionAbstract
 * @constructor
 */
function SenderDefault(options, name) {
    ActionAbstract.call(this, options);
    this.name(name);
}

SenderDefault.prototype = Object.create(ActionAbstract.prototype);

/**
 * @param  {String} [name]
 * @return {SenderDefault|String}
 */
SenderDefault.prototype.name = function (name) {
    return this.param('default', name);
};

/**
 * @return {Promise}
 */
SenderDefault.prototype.execute = function () {
    return this.request()
        .path('sender.do')
        .data(this.params())
        .json()
        .execute();
};

module.exports = SenderDefault;
