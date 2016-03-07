
var _              = require('lodash'),
    ActionAbstract = require('./action-abstract.js');

/**
 * get groups related to contact
 * @see  http://dev.smsapi.pl/#!/contacts/getGroup
 * @param {Object} options
 * @param {String} contactId
 */
function ContactsGroupsAssignmentsList(options, contactId){
    ActionAbstract.call(this, options);
    this._contactId = contactId;
}

ContactsGroupsAssignmentsList.prototype = Object.create(ActionAbstract.prototype);

/**
 * @param  {String} [contactId]
 * @return {ContactsGroupsAssignmentsList} or {String}
 */
ContactsGroupsAssignmentsList.prototype.contactId = function(contactId){
    if (_.isUndefined(contactId))
        return this._contactId;

    this._contactId = contactId;
    return this;
};

/**
 * @return {Promise}
 */
ContactsGroupsAssignmentsList.prototype.execute = function(){
    return this.request()
        .get('contacts/' + String(this._contactId) + '/groups')
        .data(this.params())
        .execute();
};

module.exports = ContactsGroupsAssignmentsList;
