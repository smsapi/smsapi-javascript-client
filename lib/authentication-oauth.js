var md5                    = require('md5'),
    _                      = require('lodash'),
    AuthenticationAbstract = require('./authentication-abstract.js');

/**
 * use oauth for authentication
 * @param {Object}  options
 * @param {String}  options.clientId
 * @param {String}  options.clientSecret
 * @param {String} [options.grantType]
 * @param {String} [options.scope]
 * @constructor
 */
function AuthenticationOAuth(options){
    AuthenticationAbstract.call(this, options);
    options            = options || {};
    this._clientId     = options.clientId;
    this._clientSecret = options.clientSecret;
    this._grantType    = options.grantType || 'password';
    this._scope        = options.scope || 'send sender receive phonebook statistic wallet.credits subuser hlr';
    this._token        = null;
}

AuthenticationOAuth.prototype = Object.create(AuthenticationAbstract.prototype);

/**
 * @param  {String} username
 * @param  {String} password
 * @return {Promise}
 */
AuthenticationOAuth.prototype.login = function(username, password){
    return this.loginHashed(username, md5(password));
};

/**
 * @param  {String} username
 * @param  {String} hashedPassword
 * @return {Promise}
 */
AuthenticationOAuth.prototype.loginHashed = function(username, hashedPassword){
    var that = this;

    var data = {
        username:      username,
        password:      hashedPassword,
        client_id:     this._clientId,
        client_secret: this._clientSecret,
        grant_type:    this._grantType,
        scope:         this._scope
    };

    var promise = this.proxy().request()
        .path('oauth/token')
        .data(data)
        .json()
        .execute();

    promise.then(function(result){
        that.setToken({
            access: result.access_token,
            refresh: result.refresh_token,
            expires: result.expires
        });
    });

    return promise;
};

/**
 * @return {Promise}
 */
AuthenticationOAuth.prototype.refreshToken = function(){
    var that = this;

    var data = {
        client_id:      this._clientId,
        client_secret:  this._clientSecret,
        grant_type:     'refresh_token',
        refresh_token:  this.getRefreshToken()
    };

    var promise = this.proxy().request()
        .path('oauth/token')
        .data(data)
        .json()
        .execute();

    promise.then(function(result){
        that.setToken({
            access: result.access_token,
            refresh: result.refresh_token,
            expires: result.expires
        });
    });

    return promise;
};

/**
 *
 * @param {String} token
 * @returns {AuthenticationOAuth}
 */
AuthenticationOAuth.prototype.setToken = function(token){
    this._token = token;
    return this;
};

/**
 *
 * @returns {null|String}
 */
AuthenticationOAuth.prototype.getToken = function(){
    return this._token;
};

/**
 *
 * @returns {null|String}
 */
AuthenticationOAuth.prototype.getAccessToken = function(){
    return this._token ? this._token.access : null;
};

/**
 *
 * @returns {null|String}
 */
AuthenticationOAuth.prototype.getRefreshToken = function(){
    return this._token ? this._token.refresh : null;
};

/**
 *
 * @returns {boolean}
 */
AuthenticationOAuth.prototype.isAuthorized = function(){
    if (this._token)
        return this._token.expires > (new Date()).getTime() / 1000;
    else
        return false;
};

/**
 *
 * @returns {{access_token: (null|String)}}
 */
AuthenticationOAuth.prototype.getPOSTParams = function(){
    return {
        access_token: this.getAccessToken()
    };
};

/**
 *
 * @returns {{Authorization: String}|{}}
 */
AuthenticationOAuth.prototype.getHeaders = function(){
    return this.getAccessToken() ? {
        Authorization: 'Bearer ' + this.getAccessToken()
    } : {};
};

/**
 *
 * @returns {AuthenticationOAuth}
 */
AuthenticationOAuth.prototype.logout = function(){
    this._token = null;
    return this;
};

module.exports = AuthenticationOAuth;
