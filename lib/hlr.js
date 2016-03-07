
var _                     = require('lodash'),
    ActionFactoryAbstract = require('./action-factory-abstract.js'),
    HlrCheck              = require('./hlr-check.js');

/**
 * @see http://www.smsapi.pl/rest
 * @param {Object} options
 */
function Hlr(options){
    ActionFactoryAbstract.call(this, options);
}

Hlr.prototype = Object.create(ActionFactoryAbstract.prototype);

/**
 * @return {HlrCheck}
 */
Hlr.prototype.check = function(){
    return this.createAction(HlrCheck);
};

module.exports = Hlr;
