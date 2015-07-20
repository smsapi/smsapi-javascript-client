
var _              = require('underscore')._,
    ActionAbstract = require('./action-abstract.js');

function PointsGet(options){
    ActionAbstract.call(this, options);
}

PointsGet.prototype = Object.create(ActionAbstract.prototype);

/**
 * @param  {Boolean} [flag]
 * @return {PointsGet} or flag
 */
PointsGet.prototype.details = function(value){
    return this.param('details', _.isUndefined(value) ? '1' : value);
};

/**
 * @return {Promise}
 */
PointsGet.prototype.execute = function(){
    this.param('credits', 1); // force param

    return this.request()
        .path('user.do')
        .data(this.params())
        .json()
        .execute();
};

module.exports = PointsGet;
