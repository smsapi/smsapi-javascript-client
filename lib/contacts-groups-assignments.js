
var _                               = require('lodash'),
    ActionFactoryAbstract           = require('./action-factory-abstract.js'),
    ContactsGroupsAssignmentsAdd    = require('./contacts-groups-assignments-add.js'),
    ContactsGroupsAssignmentsGet    = require('./contacts-groups-assignments-get.js'),
    ContactsGroupsAssignmentsList   = require('./contacts-groups-assignments-list.js'),
    ContactsGroupsAssignmentsDelete = require('./contacts-groups-assignments-delete.js');

function ContactsGroupsAssignments(options){
    ActionFactoryAbstract.call(this, options);
}

ContactsGroupsAssignments.prototype = Object.create(ActionFactoryAbstract.prototype);

/**
 * Assign contact to group
 * @see http://dev.smsapi.pl/#!/contacts/assignGroup
 * @param {String} contactId
 * @param {String} groupId
 * @return {ContactsGroupsAssignmentsAdd}
 */
ContactsGroupsAssignments.prototype.add = function(contactId, groupId){
    return this.createAction(ContactsGroupsAssignmentsAdd, contactId, groupId);
};

/**
 * get group related to contact
 * @see  http://dev.smsapi.pl/#!/contacts/getGroup_0
 * @param {String} contactId
 * @param {String} groupId
 * @return {ContactsGroupsAssignmentsGet}
 */
ContactsGroupsAssignments.prototype.get = function(contactId, groupId){
    return this.createAction(ContactsGroupsAssignmentsGet, contactId, groupId);
};

/**
 * get groups related to contact
 * @see  http://dev.smsapi.pl/#!/contacts/getGroup
 * @param {String} contactId
 * @return {ContactsGroupsAssignmentsList}
 */
ContactsGroupsAssignments.prototype.list = function(contactId){
    return this.createAction(ContactsGroupsAssignmentsList, contactId);
};

/**
 * unpin contact from group
 * @see  http://dev.smsapi.pl/#!/contacts/unpinContactGroup
 * @param {String} groupId
 * @param {String} contactId
 * @return {ContactsGroupsAssignmentsDelete}
 */
ContactsGroupsAssignments.prototype.delete = function(contactId, groupId){
    return this.createAction(ContactsGroupsAssignmentsDelete, contactId, groupId);
};

module.exports = ContactsGroupsAssignments;
