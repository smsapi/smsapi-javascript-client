var md5                    = require('md5'),
    _                      = require('lodash'),
    AuthenticationAbstract = require('./authentication-abstract.js'),
    Base64                 = require('js-base64').Base64;

/**
 * simple, using login and password, authentication
 * when used every request to the api will be altered
 * and login and password params will be added respectively
 * @param {Object} options
 */
function AuthenticationSimple(options){
    AuthenticationAbstract.call(this, options);
    this._username = null;
    this._password = null;
}

AuthenticationSimple.prototype = Object.create(AuthenticationAbstract.prototype);

/**
 * perform login
 * @param  {String} username
 * @param  {String} password
 * @return {Promise}
 */
AuthenticationSimple.prototype.login = function(username, password){
    return this.loginHashed(username, md5(password));
};

/**
 * perform login
 * @param  {String} username
 * @param  {String} hashedPassword
 * @return {Promise}
 */
AuthenticationSimple.prototype.loginHashed = function(username, hashedPassword){
    this._username = username;
    this._password = hashedPassword;

    return this.proxy().request()
        .get('profile')
        .execute();
};

/**
 *
 * @returns {{Authorization: string}}
 */
AuthenticationSimple.prototype.getHeaders = function(){
    return {
        Authorization: 'Basic ' + Base64.encode(this._username + ':' + this._password)
    };
};

/**
 *
 * @returns {boolean}
 */
AuthenticationSimple.prototype.isAuthorized = function(){
    return Boolean(this._username && this._password);
};

/**
 * @return {AuthenticationSimple}
 */
AuthenticationSimple.prototype.logout = function(){
    this._username = null;
    this._password = null;
    return this;
};

module.exports = AuthenticationSimple;
