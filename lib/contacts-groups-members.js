
var _                           = require('lodash'),
    ActionFactoryAbstract       = require('./action-factory-abstract.js'),
    ContactsGroupsMembersAdd    = require('./contacts-groups-members-add.js'),
    ContactsGroupsMembersGet    = require('./contacts-groups-members-get.js'),
    ContactsGroupsMembersDelete = require('./contacts-groups-members-delete.js');

/**
 * manage group members (contacts)
 * @param {Object} options
 */
function ContactsGroupsMembers(options){
    ActionFactoryAbstract.call(this, options);
}

ContactsGroupsMembers.prototype = Object.create(ActionFactoryAbstract.prototype);

/**
 * check whether contact is in group
 * @see http://dev.smsapi.pl/#!/contacts%2Fgroups/contactsGet
 * @param {String} groupId
 * @param {String} contactId
 * @return {ContactsGroupsMembersAdd}
 */
ContactsGroupsMembers.prototype.add = function(groupId, contactId){
    return this.createAction(ContactsGroupsMembersAdd, groupId, contactId);
};

/**
 * check whether contact is in group
 * @see http://dev.smsapi.pl/#!/contacts%2Fgroups/contactsGet
 * @param {String} groupId
 * @param {String} contactId
 * @return {ContactsGroupsMembersGet}
 */
ContactsGroupsMembers.prototype.get = function(groupId, contactId){
    return this.createAction(ContactsGroupsMembersGet, groupId, contactId);
};

/**
 * unpin contact from the group
 * @see http://dev.smsapi.pl/#!/contacts%2Fgroups/contactsDelete
 * @param {String} groupId
 * @param {String} contactId
 * @return {ContactsGroupsMembersDelete}
 */
ContactsGroupsMembers.prototype.delete = function(groupId, contactId){
    return this.createAction(ContactsGroupsMembersDelete, groupId, contactId);
};

module.exports = ContactsGroupsMembers;
