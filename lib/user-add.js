var md5 = require('md5');
var ActionAbstract = require('./action-abstract');

/**
 *
 * @param options
 * @extends ActionAbstract
 * @constructor
 */
function UserAdd(options) {
    ActionAbstract.call(this, options);
}

UserAdd.prototype = Object.create(ActionAbstract.prototype);

/**
 * required param!
 * @param  {String} [name]
 * @return {UserAdd} or name
 */
UserAdd.prototype.name = function (name) {
    return this.param('add_user', name);
};

/**
 * @param  {String} [password]
 * @return {UserAdd} or password
 */
UserAdd.prototype.pass = function (password) {
    return this.param('pass', md5(password));
};

/**
 * @param  {String} [passwordHashed]
 * @return {UserAdd|String}
 */
UserAdd.prototype.passHashed = function (passwordHashed) {
    return this.param('pass', passwordHashed);
};

/**
 * @param  {String} [passwordApi]
 * @return {UserAdd|String}
 */
UserAdd.prototype.passApi = function (passwordApi) {
    return this.param('pass_api', passwordApi);
};

/**
 * @param  {Number} [limit]
 * @return {UserAdd|Number}
 */
UserAdd.prototype.limit = function (limit) {
    return this.param('limit', limit);
};

/**
 * @param  {Number} [monthLimit]
 * @return {UserAdd|Number}
 */
UserAdd.prototype.monthLimit = function (monthLimit) {
    return this.param('month_limit', monthLimit);
};

/**
 * @param  {String} [senders]
 * @return {UserAdd|String}
 */
UserAdd.prototype.senders = function (senders) {
    return this.param('senders', senders);
};

/**
 * @param  {String} [phonebook]
 * @return {UserAdd|String}
 */
UserAdd.prototype.phonebook = function (phonebook) {
    return this.param('phonebook', phonebook);
};

/**
 * @param  {Boolean} [active]
 * @return {UserAdd|Boolean}
 */
UserAdd.prototype.active = function (active) {
    return this.param('active', active);
};

/**
 * @param  {String} [info]
 * @return {UserAdd|String}
 */
UserAdd.prototype.info = function (info) {
    return this.param('info', info);
};

/**
 * @return {Promise}
 */
UserAdd.prototype.execute = function () {
    return this.request()
        .path('user.do')
        .data(this.params())
        .json()
        .execute();
};

module.exports = UserAdd;
