var _ = require('lodash');
var ActionAbstract = require('./action-abstract.js');

/**
 *
 * @param options
 * @extends ActionAbstract
 * @constructor
 */
function PointsGet(options) {
    ActionAbstract.call(this, options);
}

PointsGet.prototype = Object.create(ActionAbstract.prototype);

/**
 * @param  {Boolean} [flag]
 * @return {PointsGet|Boolean}
 */
PointsGet.prototype.details = function (flag) {
    return this.param('details', _.isUndefined(flag) ? '1' : flag);
};

/**
 * @return {Promise}
 */
PointsGet.prototype.execute = function () {
    this.param('credits', 1); // force param

    return this.request()
        .path('user.do')
        .data(this.params())
        .json()
        .execute();
};

module.exports = PointsGet;
