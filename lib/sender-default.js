
var _              = require('lodash'),
    ActionAbstract = require('./action-abstract.js');

function SenderDefault(options, name){
    ActionAbstract.call(this, options);
    this.name(name);
}

SenderDefault.prototype = Object.create(ActionAbstract.prototype);

/**
 * @param  {String} [name]
 * @return {SenderDefault} or name
 */
SenderDefault.prototype.name = function(name){
    return this.param('default', name);
};

/**
 * @return {Promise}
 */
SenderDefault.prototype.execute = function(){
    return this.request()
        .path('sender.do')
        .data(this.params())
        .json()
        .execute();
};

module.exports = SenderDefault;
