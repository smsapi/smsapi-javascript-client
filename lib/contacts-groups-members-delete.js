
var _              = require('lodash'),
    ActionAbstract = require('./action-abstract.js');

/**
 * unpin contact from the group
 * @see http://dev.smsapi.pl/#!/contacts%2Fgroups/contactsDelete
 * @param {Object} options
 * @param {String} groupId
 * @param {String} contactId
 */
function ContactsGroupsMembersDelete(options, groupId, contactId){
    ActionAbstract.call(this, options);
    this._groupId = groupId;
    this._contactId = contactId;
}

ContactsGroupsMembersDelete.prototype = Object.create(ActionAbstract.prototype);

/**
 * get/set groupId
 * @param  {String} [groupId]
 * @return {ContactsGroupsMembersDelete} or {String}
 */
ContactsGroupsMembersDelete.prototype.groupId = function(groupId){
    if (_.isUndefined(groupId))
        return this._groupId;

    this._groupId = groupId;
    return this;
};

/**
 * get/set contactId
 * @param  {String} [contactId]
 * @return {ContactsGroupsMembersDelete} or {String}
 */
ContactsGroupsMembersDelete.prototype.contactId = function(contactId){
    if (_.isUndefined(contactId))
        return this._contactId;

    this._contactId = contactId;
    return this;
};

/**
 * execute action
 * @return {Promise}
 */
ContactsGroupsMembersDelete.prototype.execute = function(){
    return this.request()
        .delete('contacts/groups/' + String(this._groupId) + '/members/' + String(this._contactId))
        .data(this.params())
        .execute();
};

module.exports = ContactsGroupsMembersDelete;
