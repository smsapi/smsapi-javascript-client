
var _              = require('lodash'),
    ActionAbstract = require('./action-abstract.js');

/**
 * delete field
 * @see  http://dev.smsapi.pl/#!/contacts%2Ffields/delete
 * @param {Object} options
 * @param {String} id
 */
function ContactsFieldsDelete(options, id){
    ActionAbstract.call(this, options);
    this._id = id || null;
}

ContactsFieldsDelete.prototype = Object.create(ActionAbstract.prototype);

/**
 * get/set id
 * @param  {String} [id]
 * @return {ContactsFieldsDelete} or {String}
 */
ContactsFieldsDelete.prototype.id = function(id){
    if (_.isUndefined(id))
        return this._id;

    this._id = id;
    return this;
};

/**
 * execute
 * @return {Promise}
 */
ContactsFieldsDelete.prototype.execute = function(){
    return this.request()
        .delete('contacts/fields/' + String(this._id))
        .data(this.params())
        .execute();
};

module.exports = ContactsFieldsDelete;
