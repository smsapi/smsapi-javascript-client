var ActionFactoryAbstract = require('./action-factory-abstract');
var HlrCheck = require('./hlr-check');

/**
 * @see http://www.smsapi.pl/rest
 * @param {Object} options
 * @extends ActionAbstract
 * @constructor
 */
function Hlr(options) {
    ActionFactoryAbstract.call(this, options);
}

Hlr.prototype = Object.create(ActionFactoryAbstract.prototype);

/**
 * @return {HlrCheck}
 */
Hlr.prototype.check = function () {
    return this.createAction(HlrCheck);
};

module.exports = Hlr;
