
var _              = require('lodash'),
    ActionAbstract = require('./action-abstract.js');

/**
 * check whether contact is in group
 * @see http://dev.smsapi.pl/#!/contacts%2Fgroups/contactsGet
 * @param {Object} options
 * @param {String} groupId
 * @param {String} contactId
 */
function ContactsGroupsMembersGet(options, groupId, contactId){
    ActionAbstract.call(this, options);
    this._groupId = groupId;
    this._contactId = contactId;
}

ContactsGroupsMembersGet.prototype = Object.create(ActionAbstract.prototype);

/**
 * get/set groupId
 * @param  {String} groupId
 * @return {ContactsGroupsMembersGet} or {String}
 */
ContactsGroupsMembersGet.prototype.groupId = function(groupId){
    if (_.isUndefined(groupId))
        return this._groupId;

    this._groupId = groupId;
    return this;
};

/**
 * get/set contactId
 * @param  {String} contactId
 * @return {ContactsGroupsMembersGet} or {String}
 */
ContactsGroupsMembersGet.prototype.contactId = function(contactId){
    if (_.isUndefined(contactId))
        return this._contactId;

    this._contactId = contactId;
    return this;
};

/**
 * execute action
 * @return {Promise}
 */
ContactsGroupsMembersGet.prototype.execute = function(){
    return this.request()
        .get('contacts/groups/' + String(this._groupId) + '/members/' + String(this._contactId))
        .data(this.params())
        .execute();
};

module.exports = ContactsGroupsMembersGet;
