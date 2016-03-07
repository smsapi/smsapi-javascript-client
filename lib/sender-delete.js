
var _              = require('lodash'),
    ActionAbstract = require('./action-abstract.js');

function SenderDelete(options, name){
    ActionAbstract.call(this, options);
    this.name(name);
}

SenderDelete.prototype = Object.create(ActionAbstract.prototype);

/**
 * @param  {String} [name]
 * @return {SenderDelete} or name
 */
SenderDelete.prototype.name = function(name){
    return this.param('delete', name);
};

/**
 * @return {Promise}
 */
SenderDelete.prototype.execute = function(){
    return this.request()
        .path('sender.do')
        .data(this.params())
        .json()
        .execute();
};

module.exports = SenderDelete;
