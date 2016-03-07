
var _              = require('lodash'),
    ActionAbstract = require('./action-abstract.js');

/**
 * list group permissions
 * @see  http://dev.smsapi.pl/#!/contacts%2Fgroups/list_0
 * @param {Object} options
 * @param {String} groupId
 */
function ContactsGroupsPermissionsList(options, groupId){
    ActionAbstract.call(this, options);
    this._groupId = groupId;
}

ContactsGroupsPermissionsList.prototype = Object.create(ActionAbstract.prototype);

/**
 * get/set groupId
 * @param  {String} groupId
 * @return {ContactsGroupsMembersList} or {String}
 */
ContactsGroupsPermissionsList.prototype.groupId = function(groupId){
    if (_.isUndefined(groupId))
        return this._groupId;

    this._groupId = groupId;
    return this;
};

/**
 * execute action
 * @return {Promise}
 */
ContactsGroupsPermissionsList.prototype.execute = function(){
    return this.request()
        .get('contacts/groups/' + String(this._groupId) + '/permissions')
        .data(this.params())
        .execute();
};

module.exports = ContactsGroupsPermissionsList;
