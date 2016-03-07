
var _              = require('lodash'),
    ActionAbstract = require('./action-abstract.js');

/**
 * add permissions for the user
 * @see  http://dev.smsapi.pl/#!/contacts%2Fgroups/edit_0
 * @param {Object} options
 * @param {String} groupId
 * @param {String} username
 */
function ContactsGroupsPermissionsAdd(options, groupId, username){
    ActionAbstract.call(this, options);
    this._groupId = groupId;
    this._username = username;
}

ContactsGroupsPermissionsAdd.prototype = Object.create(ActionAbstract.prototype);

/**
 * get/set groupId
 * @param  {String} groupId
 * @return {ContactsGroupsMembersAdd} or {String}
 */
ContactsGroupsPermissionsAdd.prototype.groupId = function(groupId){
    if (_.isUndefined(groupId))
        return this._groupId;

    this._groupId = groupId;
    return this;
};

/**
 * get/set username
 * @param  {String} username
 * @return {ContactsGroupsMembersAdd} or {String}
 */
ContactsGroupsPermissionsAdd.prototype.username = function(username){
    if (_.isUndefined(username))
        return this._username;

    this._username = username;
    return this;
};

/**
 * get/set read
 * @param  {Boolean} read
 * @return {ContactsGroupsMembersAdd} or {Boolean}
 */
ContactsGroupsPermissionsAdd.prototype.read = function(flag){
    return this.param('read', _.isUndefined(flag) ? '1' : flag);
};

/**
 * get/set write
 * @param  {Boolean} write
 * @return {ContactsGroupsMembersAdd} or {Boolean}
 */
ContactsGroupsPermissionsAdd.prototype.write = function(flag){
    return this.param('write', _.isUndefined(flag) ? '1' : flag);
};

/**
 * get/set send
 * @param  {Boolean} send
 * @return {ContactsGroupsMembersAdd} or {Boolean}
 */
ContactsGroupsPermissionsAdd.prototype.send = function(flag){
    return this.param('send', _.isUndefined(flag) ? '1' : flag);
};

/**
 * execute action
 * @return {Promise}
 */
ContactsGroupsPermissionsAdd.prototype.execute = function(){
    return this.request()
        .post('contacts/groups/' + String(this._groupId) + '/permissions/' + String(this._username))
        .data(this.params())
        .execute();
};

module.exports = ContactsGroupsPermissionsAdd;
