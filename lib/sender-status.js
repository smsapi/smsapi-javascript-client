var ActionAbstract = require('./action-abstract');

/**
 *
 * @param options
 * @param name
 * @extends ActionAbstract
 * @constructor
 */
function SenderStatus(options, name) {
    ActionAbstract.call(this, options);
    this.name(name);
}

SenderStatus.prototype = Object.create(ActionAbstract.prototype);

/**
 * @param  {String} [name]
 * @return {SenderStatus|String}
 */
SenderStatus.prototype.name = function (name) {
    return this.param('status', name);
};

/**
 * @return {Promise}
 */
SenderStatus.prototype.execute = function () {
    return this.request()
        .path('sender.do')
        .data(this.params())
        .json()
        .execute();
};

module.exports = SenderStatus;
