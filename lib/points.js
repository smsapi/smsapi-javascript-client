var ActionFactoryAbstract = require('./action-factory-abstract');
var PointsGet = require('./points-get');

/**
 *
 * @param options
 * @extends ActionFactoryAbstract
 * @constructor
 */
function Points(options) {
    ActionFactoryAbstract.call(this, options);
}

Points.prototype = Object.create(ActionFactoryAbstract.prototype);

/**
 * @return {PointsGet}
 */
Points.prototype.get = function () {
    return this.createAction(PointsGet);
};

module.exports = Points;
