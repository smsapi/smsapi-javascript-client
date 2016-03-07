
var _              = require('lodash'),
    ActionAbstract = require('./action-abstract.js');

function SenderAdd(options){
    ActionAbstract.call(this, options);
}

SenderAdd.prototype = Object.create(ActionAbstract.prototype);

/**
 * @param  {String} [name]
 * @return {SenderAdd} or name
 */
SenderAdd.prototype.name = function(name){
    return this.param('add', name);
};

/**
 * @return {Promise}
 */
SenderAdd.prototype.execute = function(){
    return this.request()
        .path('sender.do')
        .data(this.params())
        .json()
        .execute();
};

module.exports = SenderAdd;
