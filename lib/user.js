var ActionFactoryAbstract = require('./action-factory-abstract');
var UserAdd = require('./user-add');
var UserUpdate = require('./user-update');
var UserGet = require('./user-get');
var UserList = require('./user-list');

/**
 *
 * @param options
 * @extends ActionAbstract
 * @constructor
 */
function User(options) {
    ActionFactoryAbstract.call(this, options);
}

User.prototype = Object.create(ActionFactoryAbstract.prototype);

/**
 * add new subuser
 * @return {UserAdd}
 */
User.prototype.add = function () {
    return this.createAction(UserAdd);
};

/**
 * update existing subuser
 * @param  {String} name
 * @return {UserUpdate}
 */
User.prototype.update = function (name) {
    return this.createAction(UserUpdate, name);
};

/**
 * get details about existing subuser
 * @param  {String} name
 * @return {UserGet}
 */
User.prototype.get = function (name) {
    return this.createAction(UserGet, name);
};

/**
 * get list of the subusers
 * @return {UserList}
 */
User.prototype.list = function () {
    return this.createAction(UserList);
};

module.exports = User;
