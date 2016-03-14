var _ = require('lodash');
var ActionAbstract = require('./action-abstract');

/**
 *
 * @param options
 * @extends ActionAbstract
 * @constructor
 */
function SenderList(options) {
    ActionAbstract.call(this, options);
}

SenderList.prototype = Object.create(ActionAbstract.prototype);

/**
 * @param  {Boolean} [flag]
 * @return {SenderList|Boolean}
 */
SenderList.prototype.withNatNames = function (flag) {
    return this.param('with_nat_names', _.isUndefined(flag) ? '1' : flag);
};

/**
 * @return {Promise}
 */
SenderList.prototype.execute = function () {
    this.param('list', '1'); // force param

    return this.request()
        .path('sender.do')
        .data(this.params())
        .json()
        .execute();
};

module.exports = SenderList;
