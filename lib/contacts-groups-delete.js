
var _              = require('lodash'),
    ActionAbstract = require('./action-abstract.js');

/**
 * delete group
 * @see  http://dev.smsapi.pl/#!/contacts%2Fgroups/delete
 * @param {Object} options
 * @param {String} groupId
 */
function ContactsGroupsDelete(options, id){
    ActionAbstract.call(this, options);
    this._id = id || null;
}

ContactsGroupsDelete.prototype = Object.create(ActionAbstract.prototype);

/**
 * get/set id
 * @param  {String} id
 * @return {ContactsGroupsDelete} or {String}
 */
ContactsGroupsDelete.prototype.id = function(id){
    if (_.isUndefined(id))
        return this._id;

    this._id = id;
    return this;
};

/**
 * execute action
 * @return {Promise}
 */
ContactsGroupsDelete.prototype.execute = function(){
    return this.request()
        .delete('contacts/groups/' + String(this._id))
        .data(this.params())
        .execute();
};

module.exports = ContactsGroupsDelete;
