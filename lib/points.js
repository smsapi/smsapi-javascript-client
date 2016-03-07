
var _                     = require('lodash'),
    ActionFactoryAbstract = require('./action-factory-abstract.js'),
    PointsGet             = require('./points-get.js');

function Points(options){
    ActionFactoryAbstract.call(this, options);
}

Points.prototype = Object.create(ActionFactoryAbstract.prototype);

/**
 * @return {PointsGet}
 */
Points.prototype.get = function(){
    return this.createAction(PointsGet);
};

module.exports = Points;
