
var _              = require('lodash'),
    ActionAbstract = require('./action-abstract.js');

function SenderList(options){
    ActionAbstract.call(this, options);
}

SenderList.prototype = Object.create(ActionAbstract.prototype);

/**
 * @param  {Boolean} [flag]
 * @return {SenderList} or flag
 */
SenderList.prototype.withNatNames = function(value){
    return this.param('with_nat_names', _.isUndefined(value) ? '1' : value);
};

/**
 * @return {Promise}
 */
SenderList.prototype.execute = function(){
    this.param('list', '1'); // force param

    return this.request()
        .path('sender.do')
        .data(this.params())
        .json()
        .execute();
};

module.exports = SenderList;
