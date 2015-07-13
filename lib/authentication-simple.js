
var md5                    = require('MD5'),
    _                      = require('underscore')._,
    Promise                = require('rsvp').Promise,
    AuthenticationAbstract = require('./authentication-abstract.js');

/**
 * simple, using login and password, athentication
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
 * WARNING:
 * credentials are not validated and user is not
 * authenticated here (due to technical reasons)
 * it means that login action can end with success, but user
 * will not be able to retrieve data from api
 * @param  {String} username
 * @param  {String} password
 * @return {Promise} will resolve instantly (only deferred)
 */
AuthenticationSimple.prototype.login = function(username, password){
    this._username = username;
    this._password = md5(password);

    return new Promise(function(resolve, reject){
        // defer
        if (username && password)
            setTimeout(resolve, 0);
        else
            setTimeout(reject, 0);
    });
};

AuthenticationSimple.prototype.getGETParams = function(){
    return {
        username: this._username,
        password: this._password
    };
};

AuthenticationSimple.prototype.isAuthorized = function(){
    return this._username && this._password;
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

