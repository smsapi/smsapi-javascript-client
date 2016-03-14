var ActionAbstract = require('./action-abstract');
var md5 = require('md5');

/**
 *
 * @param options
 * @param name
 * @extends ActionAbstract
 * @constructor
 */
function UserUpdate(options, name) {
    ActionAbstract.call(this, options);
    this.name(name);
}

UserUpdate.prototype = Object.create(ActionAbstract.prototype);

/**
 * @param  {String} [name]
 * @return {UserUpdate|String}
 */
UserUpdate.prototype.name = function (name) {
    return this.param('set_user', name);
};

/**
 * @param  {String} [username]
 * @return {UserUpdate|String}
 */
UserUpdate.prototype.username = function (username) {
    return this.param('username', username);
};

/**
 * @param  {String} [password]
 * @return {UserUpdate|String}
 */
UserUpdate.prototype.password = function (password) {
    return this.param('pass', md5(password));
};

/**
 * @param  {String} [passwordApi]
 * @return {UserUpdate|String}
 */
UserUpdate.prototype.passwordApi = function (passwordApi) {
    return this.param('pass_api', passwordApi);
};

/**
 * @param  {Number} [limit]
 * @return {UserUpdate|Number}
 */
UserUpdate.prototype.limit = function (limit) {
    return this.param('limit', limit);
};

/**
 * @param  {Number} [monthLimit]
 * @return {UserUpdate|Number}
 */
UserUpdate.prototype.monthLimit = function (monthLimit) {
    return this.param('month_limit', monthLimit);
};

/**
 * @param  {String} [senders]
 * @return {UserUpdate|String}
 */
UserUpdate.prototype.senders = function (senders) {
    return this.param('senders', senders);
};

/**
 * @param  {String} [phonebook]
 * @return {UserUpdate|String}
 */
UserUpdate.prototype.phonebook = function (phonebook) {
    return this.param('phonebook', phonebook);
};

/**
 * @param  {Boolean} [active]
 * @return {UserUpdate|Boolean}
 */
UserUpdate.prototype.active = function (active) {
    return this.param('active', active);
};

/**
 * @param  {String} [info]
 * @return {UserUpdate} or info
 */
UserUpdate.prototype.info = function (info) {
    return this.param('info', info);
};

/**
 * @return {Promise}
 */
UserUpdate.prototype.execute = function () {
    return this.request()
        .path('user.do')
        .data(this.params())
        .json()
        .execute();
};

module.exports = UserUpdate;
