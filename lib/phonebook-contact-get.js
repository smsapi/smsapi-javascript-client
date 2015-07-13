
var _              = require('underscore')._,
    ActionAbstract = require('./action-abstract.js');

function PhonebookContactGet(options, number){
    ActionAbstract.call(this, options);
    this.number(number);
}

PhonebookContactGet.prototype = Object.create(ActionAbstract.prototype);

/**
 * @param  {String} [number]
 * @return {PhonebookContactGet} or number
 */
PhonebookContactGet.prototype.number = function(number){
    return this.param('get_contact', number);
};

/**
 * @return {Promise}
 */
PhonebookContactGet.prototype.execute = function(){
    return this.request()
        .path('phonebook.do')
        .data(this.params())
        .execute();
};

module.exports = PhonebookContactGet;
