
var _              = require('lodash'),
	md5            = require('md5'),
    ActionAbstract = require('./action-abstract.js');

function UserAdd(options){
    ActionAbstract.call(this, options);
}

UserAdd.prototype = Object.create(ActionAbstract.prototype);

/**
 * required param!
 * @param  {String} [name]
 * @return {UserAdd} or name
 */
UserAdd.prototype.name = function(name){
    return this.param('add_user', name);
};

/**
 * @param  {String} [password]
 * @return {UserAdd} or password
 */
UserAdd.prototype.pass = function(password){
    return this.param('pass', md5(password));
};

/**
 * @param  {String} [passwordHashed]
 * @return {UserAdd} or passwordHashed
 */
UserAdd.prototype.passHashed = function(passHashed){
    return this.param('pass', passHashed);
};

/**
 * @param  {String} [passApi]
 * @return {UserAdd} or passApi
 */
UserAdd.prototype.passApi = function(passwordApi){
    return this.param('pass_api', passwordApi);
};

/**
 * @param  {Integer} [limit]
 * @return {UserAdd} or limit
 */
UserAdd.prototype.limit = function(limit){
    return this.param('limit', limit);
};

/**
 * @param  {Integer} [monthLimit]
 * @return {UserAdd} or monthLimit
 */
UserAdd.prototype.monthLimit = function(monthLimit){
    return this.param('month_limit', monthLimit);
};

/**
 * @param  {Boolean} [flag]
 * @return {UserAdd} or flag
 */
UserAdd.prototype.senders = function(senders){
    return this.param('senders', senders);
};

/**
 * @param  {Boolean} [flag]
 * @return {UserAdd} or flag
 */
UserAdd.prototype.phonebook = function(phonebook){
    return this.param('phonebook', phonebook);
};

/**
 * @param  {Boolean} [flag]
 * @return {UserAdd} or flag
 */
UserAdd.prototype.active = function(active){
    return this.param('active', active);
};

/**
 * @param  {String} [info]
 * @return {UserAdd} or info
 */
UserAdd.prototype.info = function(info){
    return this.param('info', info);
};

/**
 * @return {Promise}
 */
UserAdd.prototype.execute = function(){
    return this.request()
        .path('user.do')
        .data(this.params())
        .json()
        .execute();
};

module.exports = UserAdd;
