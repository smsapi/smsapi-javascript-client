
var _              = require('lodash'),
    ActionAbstract = require('./action-abstract.js');

/**
 * pin contact to the group
 * @see http://dev.smsapi.pl/#!/contacts%2Fgroups/contactsPut
 * @param {Object} options
 * @param {String} groupId
 * @param {String} contactId
 */
function ContactsGroupsMembersAdd(options, groupId, contactId){
    ActionAbstract.call(this, options);
    this._groupId = groupId;
    this._contactId = contactId;
}

ContactsGroupsMembersAdd.prototype = Object.create(ActionAbstract.prototype);

/**
 * get/set groupId
 * @param  {String} groupId
 * @return {ContactsGroupsMembersAdd} or {String}
 */
ContactsGroupsMembersAdd.prototype.groupId = function(groupId){
    if (_.isUndefined(groupId))
        return this._groupId;

    this._groupId = groupId;
    return this;
};

/**
 * get/set contactId
 * @param  {String} contactId
 * @return {ContactsGroupsMembersAdd} or {String}
 */
ContactsGroupsMembersAdd.prototype.contactId = function(contactId){
    if (_.isUndefined(contactId))
        return this._contactId;

    this._contactId = contactId;
    return this;
};

/**
 * execute action
 * @return {Promise}
 */
ContactsGroupsMembersAdd.prototype.execute = function(){
    return this.request()
        .put('contacts/groups/' + String(this._groupId) + '/members/' + String(this._contactId))
        .data(this.params())
        .execute();
};

module.exports = ContactsGroupsMembersAdd;
