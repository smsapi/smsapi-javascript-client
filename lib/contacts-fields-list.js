
var _              = require('lodash'),
    ActionAbstract = require('./action-abstract.js');

/**
 * get list of fields
 * @see http://dev.smsapi.pl/#!/contacts%2Ffields/list
 * @param {Object} options
 */
function ContactsFieldsList(options){
    ActionAbstract.call(this, options);
}

ContactsFieldsList.prototype = Object.create(ActionAbstract.prototype);

/**
 * execute
 * @return {Promise}
 */
ContactsFieldsList.prototype.execute = function(){
    return this.request()
        .get('contacts/fields')
        .data(this.params())
        .execute();
};

module.exports = ContactsFieldsList;
