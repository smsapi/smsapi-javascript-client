
var _              = require('lodash'),
    ActionAbstract = require('./action-abstract.js');

/**
 * unpin contact from group
 * @see  http://dev.smsapi.pl/#!/contacts/unpinContactGroup
 * @param {Object} options
 * @param {String} contactId
 * @param {String} groupId
 */
function ContactsGroupsAssignmentsDelete(options, contactId, groupId){
    ActionAbstract.call(this, options);
    this._groupId = groupId;
    this._contactId = contactId;
}

ContactsGroupsAssignmentsDelete.prototype = Object.create(ActionAbstract.prototype);

/**
 * get/set groupId
 * @param  {String} [groupId]
 * @return {ContactsGroupsAssignmentsDelete} or {String}
 */
ContactsGroupsAssignmentsDelete.prototype.groupId = function(groupId){
    if (_.isUndefined(groupId))
        return this._groupId;

    this._groupId = groupId;
    return this;
};

/**
 * get/set contactId
 * @param  {String} [contactId]
 * @return {ContactsGroupsAssignmentsDelete} or {String}
 */
ContactsGroupsAssignmentsDelete.prototype.contactId = function(contactId){
    if (_.isUndefined(contactId))
        return this._contactId;

    this._contactId = contactId;
    return this;
};

/**
 * execute
 * @return {Promise}
 */
ContactsGroupsAssignmentsDelete.prototype.execute = function(){
    return this.request()
        .delete('contacts/' + String(this._contactId) + '/groups/' + String(this._groupId))
        .data(this.params())
        .execute();
};

module.exports = ContactsGroupsAssignmentsDelete;
