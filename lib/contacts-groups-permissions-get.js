
var _              = require('lodash'),
    ActionAbstract = require('./action-abstract.js');

/**
 * get group permissions for user
 * @see  http://dev.smsapi.pl/#!/contacts%2Fgroups/get_0
 * @param {Object} options
 * @param {String} groupId
 * @param {String} username
 */
function ContactsGroupsPermissionsGet(options, groupId, username){
    ActionAbstract.call(this, options);
    this._groupId = groupId;
    this._username = username;
}

ContactsGroupsPermissionsGet.prototype = Object.create(ActionAbstract.prototype);

/**
 * get/set groupId
 * @param  {String} groupId
 * @return {ContactsGroupsMembersGet} or {String}
 */
ContactsGroupsPermissionsGet.prototype.groupId = function(groupId){
    if (_.isUndefined(groupId))
        return this._groupId;

    this._groupId = groupId;
    return this;
};

/**
 * get/set username
 * @param  {String} username
 * @return {ContactsGroupsMembersGet} or {String}
 */
ContactsGroupsPermissionsGet.prototype.username = function(username){
    if (_.isUndefined(username))
        return this._username;

    this._username = username;
    return this;
};

/**
 * execute action
 * @return {Promise}
 */
ContactsGroupsPermissionsGet.prototype.execute = function(){
    return this.request()
        .get('contacts/groups/' + String(this._groupId) + '/permissions/' + String(this._username))
        .data(this.params())
        .execute();
};

module.exports = ContactsGroupsPermissionsGet;
