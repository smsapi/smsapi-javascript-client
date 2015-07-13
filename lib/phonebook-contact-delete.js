
var _              = require('underscore')._,
    ActionAbstract = require('./action-abstract.js');

function PhonebookContactDelete(options, number){
    ActionAbstract.call(this, options);
    this.number(number);
}

PhonebookContactDelete.prototype = Object.create(ActionAbstract.prototype);

/**
 * @param  {String} [number]
 * @return {PhonebookContactDelete} or number
 */
PhonebookContactDelete.prototype.number = function(number){
    return this.param('delete_contact', number);
};

/**
 * @return {Promise}
 */
PhonebookContactDelete.prototype.execute = function(){
    return this.request()
        .path('phonebook.do')
        .data(this.params())
        .execute();
};

module.exports = PhonebookContactDelete;
