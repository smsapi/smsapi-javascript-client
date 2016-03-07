
var _              = require('lodash'),
    ActionAbstract = require('./action-abstract.js');

/**
 * get group related to contact
 * @see  http://dev.smsapi.pl/#!/contacts/getGroup_0
 * @param {Object} options
 * @param {String} contactId
 * @param {String} groupId
 */
function ContactsGroupsAssignmentsGet(options, contactId, groupId){
    ActionAbstract.call(this, options);
    this._groupId = groupId;
    this._contactId = contactId;
}

ContactsGroupsAssignmentsGet.prototype = Object.create(ActionAbstract.prototype);

/**
 * get/set groupId
 * @param  {String} [groupId]
 * @return {ContactsGroupsAssignmentsGet} or {String}
 */
ContactsGroupsAssignmentsGet.prototype.groupId = function(groupId){
    if (_.isUndefined(groupId))
        return this._groupId;

    this._groupId = groupId;
    return this;
};

/**
 * get/set contactId
 * @param  {String} [contactId]
 * @return {ContactsGroupsAssignmentsGet} or {String}
 */
ContactsGroupsAssignmentsGet.prototype.contactId = function(contactId){
    if (_.isUndefined(contactId))
        return this._contactId;

    this._contactId = contactId;
    return this;
};

/**
 * execute
 * @return {Promise}
 */
ContactsGroupsAssignmentsGet.prototype.execute = function(){
    return this.request()
        .get('contacts/' + String(this._contactId) + '/groups/' + String(this._groupId))
        .data(this.params())
        .execute();
};

module.exports = ContactsGroupsAssignmentsGet;
