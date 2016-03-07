
var _              = require('lodash'),
    ActionAbstract = require('./action-abstract.js');

function UserUpdate(options, name){
    ActionAbstract.call(this, options);
    this.name(name);
}

UserUpdate.prototype = Object.create(ActionAbstract.prototype);

/**
 * @param  {String} [name]
 * @return {UserUpdate} or name
 */
UserUpdate.prototype.name = function(name){
    return this.param('set_user', name);
};

/**
 * @param  {String} [username]
 * @return {UserUpdate} or username
 */
UserUpdate.prototype.username = function(username){
    return this.param('username', username);
};

/**
 * @param  {String} [password]
 * @return {UserUpdate} or password
 */
UserUpdate.prototype.password = function(password){
    return this.param('pass', md5(password));
};

/**
 * @param  {String} [passwordApi]
 * @return {UserUpdate} or passwordApi
 */
UserUpdate.prototype.passwordApi = function(passwordApi){
    return this.param('pass_api', passwordApi);
};

/**
 * @param  {Integer} [limit]
 * @return {UserUpdate} or limit
 */
UserUpdate.prototype.limit = function(limit){
    return this.param('limit', limit);
};

/**
 * @param  {Integer} [monthLimit]
 * @return {UserUpdate} or monthLimit
 */
UserUpdate.prototype.monthLimit = function(monthLimit){
    return this.param('month_limit', monthLimit);
};

/**
 * @param  {Boolean} [flag]
 * @return {UserUpdate} or flag
 */
UserUpdate.prototype.senders = function(senders){
    return this.param('senders', senders);
};

/**
 * @param  {Boolean} [flag]
 * @return {UserUpdate} or flag
 */
UserUpdate.prototype.phonebook = function(phonebook){
    return this.param('phonebook', phonebook);
};

/**
 * @param  {Boolean} [flag]
 * @return {UserUpdate} or flag
 */
UserUpdate.prototype.active = function(active){
    return this.param('active', active);
};

/**
 * @param  {String} [info]
 * @return {UserUpdate} or info
 */
UserUpdate.prototype.info = function(info){
    return this.param('info', info);
};

/**
 * @return {Promise}
 */
UserUpdate.prototype.execute = function(){
    return this.request()
        .path('user.do')
        .data(this.params())
        .json()
        .execute();
};

module.exports = UserUpdate;
