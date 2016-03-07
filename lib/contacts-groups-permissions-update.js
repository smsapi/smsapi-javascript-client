
var _              = require('lodash'),
    ActionAbstract = require('./action-abstract.js');

/**
 * update permissions
 * @see  http://dev.smsapi.pl/#!/contacts%2Fgroups/edit_0
 * @param {Object} options
 * @param {String} groupId
 * @param {String} username
 */
function ContactsGroupsPermissionsUpdate(options, groupId, username){
    ActionAbstract.call(this, options);
    this._groupId = groupId;
    this._username = username;
}

ContactsGroupsPermissionsUpdate.prototype = Object.create(ActionAbstract.prototype);

/**
 * get/set groupId
 * @param  {String} groupId
 * @return {ContactsGroupsMembersUpdate} or {String}
 */
ContactsGroupsPermissionsUpdate.prototype.groupId = function(groupId){
    if (_.isUndefined(groupId))
        return this._groupId;

    this._groupId = groupId;
    return this;
};

/**
 * get/set username
 * @param  {String} username
 * @return {ContactsGroupsMembersUpdate} or {String}
 */
ContactsGroupsPermissionsUpdate.prototype.username = function(username){
    if (_.isUndefined(username))
        return this._username;

    this._username = username;
    return this;
};

/**
 * get/set read
 * @param  {Boolean} read
 * @return {ContactsGroupsMembersUpdate} or {Boolean}
 */
ContactsGroupsPermissionsUpdate.prototype.read = function(flag){
    return this.param('read', _.isUndefined(flag) ? '1' : flag);
};

/**
 * get/set write
 * @param  {Boolean} write
 * @return {ContactsGroupsMembersUpdate} or {Boolean}
 */
ContactsGroupsPermissionsUpdate.prototype.write = function(flag){
    return this.param('write', _.isUndefined(flag) ? '1' : flag);
};

/**
 * get/set send
 * @param  {Boolean} send
 * @return {ContactsGroupsMembersUpdate} or {Boolean}
 */
ContactsGroupsPermissionsUpdate.prototype.send = function(flag){
    return this.param('send', _.isUndefined(flag) ? '1' : flag);
};

/**
 * execute action
 * @return {Promise}
 */
ContactsGroupsPermissionsUpdate.prototype.execute = function(){
    return this.request()
        .put('contacts/groups/' + String(this._groupId) + '/permissions/' + String(this._username))
        .data(this.params())
        .execute();
};

module.exports = ContactsGroupsPermissionsUpdate;
