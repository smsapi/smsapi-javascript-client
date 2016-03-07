
var _              = require('lodash'),
    ActionAbstract = require('./action-abstract.js');

/**
 * Assign contact to group
 * @see http://dev.smsapi.pl/#!/contacts/assignGroup
 * @param {Object} options
 * @param {String} contactId
 * @param {String} groupId
 */
function ContactsGroupsAssignmentsAdd(options, contactId, groupId){
    ActionAbstract.call(this, options);
    this._groupId = groupId;
    this._contactId = contactId;
}

ContactsGroupsAssignmentsAdd.prototype = Object.create(ActionAbstract.prototype);

/**
 * get/set groupId
 * @param  {String} [groupId]
 * @return {ContactsGroupsAssignmentsAdd}
 */
ContactsGroupsAssignmentsAdd.prototype.groupId = function(groupId){
    if (_.isUndefined(groupId))
        return this._groupId;

    this._groupId = groupId;
    return this;
};

/**
 * get/set contactId
 * @param  {String} [contactId]
 * @return {ContactsGroupsAssignmentsAdd} or {String}
 */
ContactsGroupsAssignmentsAdd.prototype.contactId = function(contactId){
    if (_.isUndefined(contactId))
        return this._contactId;

    this._contactId = contactId;
    return this;
};

/**
 * @return {Promise}
 */
ContactsGroupsAssignmentsAdd.prototype.execute = function(){
    return this.request()
        .put('contacts/' + String(this._contactId) + '/groups/' + String(this._groupId))
        .data(this.params())
        .execute();
};

module.exports = ContactsGroupsAssignmentsAdd;
