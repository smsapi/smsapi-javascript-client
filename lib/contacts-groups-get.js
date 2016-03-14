var _ = require('lodash');
var ActionAbstract = require('./action-abstract');

/**
 * get group
 * @see  http://dev.smsapi.pl/#!/contacts%2Fgroups/get
 * @param {Object} options
 * @param {String} groupId
 * @extends ActionAbstract
 * @constructor
 */
function ContactsGroupsGet(options, groupId) {
    ActionAbstract.call(this, options);
    this._id = groupId || null;
}

ContactsGroupsGet.prototype = Object.create(ActionAbstract.prototype);

/**
 * get/set id
 * @param  {String} id
 * @return {ContactsGroupsGet} or {String}
 */
ContactsGroupsGet.prototype.id = function (id) {
    if (_.isUndefined(id))
        return this._id;

    this._id = id;
    return this;
};

/**
 * execute action
 * @return {Promise}
 */
ContactsGroupsGet.prototype.execute = function () {
    return this.request()
        .get('contacts/groups/' + String(this._id))
        .data(this.params())
        .execute();
};

module.exports = ContactsGroupsGet;
