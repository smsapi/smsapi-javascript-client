
var _              = require('underscore')._,
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
        .execute();
};

module.exports = SenderDefault;
